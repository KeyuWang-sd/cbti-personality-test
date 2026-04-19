const { getSupabase } = require('../config/dbConnection');
const personalities = require('../data/personalities');

const resultController = {
  // 提交测试结果
  submitResult: async (req, res) => {
    try {
      const { answers, scores, personality, dimensionResults } = req.body;
      
      const supabase = getSupabase();
      
      // 插入结果到数据库
      const { data, error } = await supabase
        .from('results')
        .insert({
          answers: JSON.stringify(answers),
          scores: JSON.stringify(scores),
          personality: JSON.stringify(personality),
          dimension_results: JSON.stringify(dimensionResults)
        })
        .select();
      
      if (error) {
        console.error('插入结果失败:', error);
        return res.status(500).json({ error: '插入结果失败' });
      }
      
      res.status(201).json({ message: '结果提交成功', data });
    } catch (error) {
      console.error('提交结果失败:', error);
      res.status(500).json({ error: '服务器内部错误' });
    }
  },

  // 获取统计数据
  getStatistics: async (req, res) => {
    try {
      const supabase = getSupabase();
      
      // 查询所有结果
      const { data, error } = await supabase
        .from('results')
        .select('*');
      
      if (error) {
        console.error('获取统计数据失败:', error);
        return res.status(500).json({ error: '获取统计数据失败' });
      }
      
      // 统计人格分布
      const personalityStats = {};
      data.forEach(result => {
        const personality = JSON.parse(result.personality);
        const code = personality.code;
        personalityStats[code] = (personalityStats[code] || 0) + 1;
      });
      
      res.json({ 
        totalTests: data.length, 
        personalityStats 
      });
    } catch (error) {
      console.error('获取统计数据失败:', error);
      res.status(500).json({ error: '服务器内部错误' });
    }
  },

  // 获取所有结果（管理员）
  getAllResults: async (req, res) => {
    try {
      const supabase = getSupabase();
      
      // 查询所有结果
      const { data, error } = await supabase
        .from('results')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('获取所有结果失败:', error);
        return res.status(500).json({ error: '获取所有结果失败' });
      }
      
      res.json(data);
    } catch (error) {
      console.error('获取所有结果失败:', error);
      res.status(500).json({ error: '服务器内部错误' });
    }
  }
};

module.exports = resultController;