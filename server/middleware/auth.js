const { getPool } = require('../config/dbConnection');

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
    
    const pool = getPool();
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE username = ? AND role = ?',
      [username, 'admin']
    );
    
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: '认证失败'
      });
    }
    
    const user = users[0];
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: '认证失败'
      });
    }
    
    req.user = user;
    next();
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
    const pool = getPool();
    
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE username = ? AND role = ?',
      [username, 'admin']
    );
    
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: '用户名或密码错误'
      });
    }
    
    const user = users[0];
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: '用户名或密码错误'
      });
    }
    
    const token = Buffer.from(`${username}:${password}`).toString('base64');
    
    res.json({
      success: true,
      data: {
        token,
        username: user.username
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message
    });
  }
};

module.exports = { adminAuth, login };
