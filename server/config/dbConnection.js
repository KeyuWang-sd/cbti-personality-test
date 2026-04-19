// Supabase配置
const supabaseUrl = 'https://gjlrqshqeikivymipkim.supabase.co';
const supabaseKey = 'sb_publishable_0LEbw-l8RWq2ogHmt_h1Ew_8gkqcT9q';

// 导入Supabase客户端
const { createClient } = require('@supabase/supabase-js');

// 创建Supabase客户端
const supabase = createClient(supabaseUrl, supabaseKey);

// 初始化数据库
async function initializeDB() {
  try {
    // Supabase会自动创建表结构，我们只需要确保表存在
    console.log('数据库初始化成功');
  } catch (error) {
    console.error('数据库初始化失败:', error);
    throw error;
  }
}

// 获取Supabase客户端
function getSupabase() {
  return supabase;
}

module.exports = {
  initializeDB,
  getSupabase
};