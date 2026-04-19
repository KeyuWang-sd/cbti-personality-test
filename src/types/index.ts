// 维度类型定义
export type DimensionType = 'S' | 'L' | 'D' | 'W';

// 维度方向定义
export type DimensionDirection = 'positive' | 'negative';

// 维度得分接口
export interface DimensionScore {
  S: number; // 社交维度：外放喧嚣(正) ↔ 独处缄默(负)
  L: number; // 学习维度：激进内卷(正) ↔ 虚无摆烂(负)
  D: number; // 行事维度：秩序自律(正) ↔ 混沌拖延(负)
  W: number; // 内心维度：现实功利(正) ↔ 感性内耗(负)
}

// 人格定义接口
export interface Personality {
  id: string;
  name: string; // 中文梗名
  code: string; // 英文缩写
  dimensions: {
    S: DimensionDirection;
    L: DimensionDirection;
    D: DimensionDirection;
    W: DimensionDirection;
  };
  description: string; // 释义
  isEasterEgg?: boolean; // 是否为彩蛋
}

// 测试结果接口
export interface TestResult {
  scores: DimensionScore;
  personality: Personality;
  dimensionResults: {
    S: { direction: DimensionDirection; score: number };
    L: { direction: DimensionDirection; score: number };
    D: { direction: DimensionDirection; score: number };
    W: { direction: DimensionDirection; score: number };
  };
}
