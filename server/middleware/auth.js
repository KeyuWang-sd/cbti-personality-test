const { getSupabase } = require('../config/dbConnection');

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: '未提供认证令牌'
      });
    }
    
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = decoded.split(':');
    
    // 简单的管理员认证（暂时硬编码）
    if (username === 'admin' && password === 'admin123') {
      req.user = { username, role: 'admin' };
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: '认证失败'
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: '认证失败',
      error: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 简单的管理员登录（暂时硬编码）
    if (username === 'admin' && password === 'admin123') {
      const token = Buffer.from(`${username}:${password}`).toString('base64');
      
      res.json({
        success: true,
        data: {
          token,
          username
        }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: '用户名或密码错误'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message
    });
  }
};

module.exports = { adminAuth, login };
