import { DimensionScore, DimensionDirection, Personality, TestResult } from '../../types';
import { personalities } from '../data/personalities';

// 题目维度映射 - 固定顺序从1到40
const questionDimensions: ('S' | 'L' | 'D' | 'W')[] = [
  'D', 'D', 'S', 'L', 'W', 'S', 'D', 'L', 'S', 'W',
  'S', 'D', 'S', 'L', 'W', 'S', 'D', 'L', 'S', 'W',
  'D', 'L', 'S', 'W', 'S', 'D', 'S', 'L', 'W', 'S',
  'D', 'L', 'S', 'W', 'D', 'L', 'W', 'L', 'W', 'S'
];

// 计算维度得分
export function calculateScores(answers: (1 | 0 | -1)[]): DimensionScore {
  let S = 0;
  let L = 0;
  let D = 0;
  let W = 0;
  
  for (let i = 0; i < answers.length; i++) {
    const dimension = questionDimensions[i];
    const score = answers[i];
    
    switch (dimension) {
      case 'S':
        S += score;
        break;
      case 'L':
        L += score;
        break;
      case 'D':
        D += score;
        break;
      case 'W':
        W += score;
        break;
    }
  }
  
  return { S, L, D, W };
}

// 确定维度方向
export function determineDirection(score: number, maxPossibleScore: number): DimensionDirection {
  if (score > 0) return 'positive';
  if (score < 0) return 'negative';
  return 'neutral';
}

// 匹配人格
export function matchPersonality(scores: DimensionScore, maxPossibleScores: DimensionScore): Personality {
  // First, check if all or mostly neutral
  const neutralCount = Object.values(scores).filter(s => s === 0).length;
  if (neutralCount >= 3) {
    const balance = personalities.find(p => p.code === 'BALANCE');
    if (balance) return balance;
  }
  
  const dimensionDirections = {
    S: scores.S >= 0 ? 'positive' : 'negative',
    L: scores.L >= 0 ? 'positive' : 'negative',
    D: scores.D >= 0 ? 'positive' : 'negative',
    W: scores.W >= 0 ? 'positive' : 'negative'
  };
  
  const matchedPersonalities = personalities.filter(personality => {
    return (
      personality.dimensions.S === dimensionDirections.S &&
      personality.dimensions.L === dimensionDirections.L &&
      personality.dimensions.D === dimensionDirections.D &&
      personality.dimensions.W === dimensionDirections.W &&
      !personality.isEasterEgg
    );
  });
  
  if (matchedPersonalities.length > 0) {
    return matchedPersonalities[0];
  }
  
  const easterEggPersonalities = personalities.filter(personality => {
    return (
      personality.dimensions.S === dimensionDirections.S &&
      personality.dimensions.L === dimensionDirections.L &&
      personality.dimensions.D === dimensionDirections.D &&
      personality.dimensions.W === dimensionDirections.W &&
      personality.isEasterEgg
    );
  });
  
  if (easterEggPersonalities.length > 0) {
    return easterEggPersonalities[0];
  }
  
  return personalities[0];
}

// 计算每个维度的题目数量
export function getDimensionQuestionCounts(): { S: number; L: number; D: number; W: number } {
  const counts = { S: 0, L: 0, D: 0, W: 0 };
  
  questionDimensions.forEach(dimension => {
    counts[dimension]++;
  });
  
  return counts;
}

// 计算每个维度的最大可能得分
export function getMaxPossibleScores(): DimensionScore {
  const counts = getDimensionQuestionCounts();
  
  return {
    S: counts.S,
    L: counts.L,
    D: counts.D,
    W: counts.W
  };
}

// 生成测试结果
export function generateTestResult(answers: (1 | 0 | -1)[]): TestResult {
  const scores = calculateScores(answers);
  const maxPossibleScores = getMaxPossibleScores();
  const personality = matchPersonality(scores, maxPossibleScores);
  
  const isBalance = personality.code === 'BALANCE';
  
  const getDirection = (score: number) => {
    if (isBalance) return 'neutral';
    return score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';
  };
  
  const dimensionResults = {
    S: {
      direction: getDirection(scores.S) as DimensionDirection,
      score: scores.S
    },
    L: {
      direction: getDirection(scores.L) as DimensionDirection,
      score: scores.L
    },
    D: {
      direction: getDirection(scores.D) as DimensionDirection,
      score: scores.D
    },
    W: {
      direction: getDirection(scores.W) as DimensionDirection,
      score: scores.W
    }
  };
  
  return {
    scores,
    personality,
    dimensionResults
  };
}
