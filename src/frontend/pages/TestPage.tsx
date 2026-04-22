import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import QuestionCard from '../components/QuestionCard';
import { questions } from '../data/questions';
import { generateTestResult } from '../../core/algorithms/scoring';
import { personalityIcons } from '../data/personalityIcons';
import { handleShareClick } from '../utils/wechatShare';

// 使用相对于 dist 根目录的路径，确保部署后能找到 logo.jpg
const logoImg = './logo.jpg';

// Supabase配置
const SUPABASE_URL = 'https://gjlrqshqeikivymipkim.supabase.co';
const SUPABASE_KEY = 'sb_publishable_0LEbw-l8RWq2ogHmt_h1Ew_8gkqcT9q';

// 初始化Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const TestPage: React.FC = () => {
  // 昵称输入状态
  const [nickname, setNickname] = useState('');
  const [showStartTest, setShowStartTest] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  // 测试状态
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const saved = localStorage.getItem('cbti_currentQuestion');
    return saved ? parseInt(saved) : 0;
  });
  const [answers, setAnswers] = useState<('A' | 'B' | 'C' | null)[]>(() => {
    const saved = localStorage.getItem('cbti_answers');
    return saved ? JSON.parse(saved) : Array(questions.length).fill(null);
  });
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    localStorage.setItem('cbti_currentQuestion', String(currentQuestionIndex));
  }, [currentQuestionIndex]);

  useEffect(() => {
    localStorage.setItem('cbti_answers', JSON.stringify(answers));
  }, [answers]);

  // 开始测试
  const handleStartTest = () => {
    if (!nickname.trim()) {
      setModalMessage('请先填写昵称');
      setShowModal(true);
      return;
    }
    
    setShowStartTest(true);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestionIndex];

  const handleSelectAnswer = (answer: 'A' | 'B' | 'C') => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const saveResultToSupabase = async (nickname: string, result: any) => {
    if (!supabase) {
      console.error('Supabase未初始化');
      return false;
    }
    
    try {
      const { data, error } = await supabase
        .from('results')
        .insert({
          answers: JSON.stringify({ nickname: nickname || '匿名' }),
          scores: JSON.stringify(result.scores),
          personality: result.personality.code,
          dimension_results: JSON.stringify({
            social: result.dimensionResults.S.direction === 'neutral' ? '均衡' : result.dimensionResults.S.direction === 'positive' ? '外放喧嚣' : '独处缄默',
            study: result.dimensionResults.L.direction === 'neutral' ? '均衡' : result.dimensionResults.L.direction === 'positive' ? '激进内卷' : '虚无摆烂',
            action: result.dimensionResults.D.direction === 'neutral' ? '均衡' : result.dimensionResults.D.direction === 'positive' ? '秩序自律' : '混沌拖延',
            heart: result.dimensionResults.W.direction === 'neutral' ? '均衡' : result.dimensionResults.W.direction === 'positive' ? '现实功利' : '感性内耗'
          })
        })
        .select();

      if (error) {
        console.error('保存失败:', error);
        return false;
      }

      console.log('结果已保存到Supabase:', data);
      localStorage.removeItem('cbti_currentQuestion');
      localStorage.removeItem('cbti_answers');
      return true;
    } catch (error) {
      console.error('保存失败:', error);
      return false;
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const unansweredCount = answers.filter(a => a === null).length;
      if (unansweredCount > 0) {
        const confirmed = window.confirm(`您还有 ${unansweredCount} 道题未作答，确定要提交吗？`);
        if (!confirmed) {
          return;
        }
      }

      const numericalAnswers = answers.map(answer => {
        switch (answer) {
          case 'A': return 1;
          case 'C': return 0;
          case 'B': return -1;
          default: return 0;
        }
      });

      const result = generateTestResult(numericalAnswers as (1 | 0 | -1)[]);
      setTestResult(result);
      setTestCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // 获取维度详细解读
  const getDimensionInterpretation = (dimension: 'S' | 'L' | 'D' | 'W', direction: 'positive' | 'negative' | 'neutral') => {
    const interpretations = {
      S: {
        positive: '你是一个外向开朗的社交达人，喜欢与人交流，善于建立人际关系。在群体中你总是能自然地融入，甚至成为焦点人物。你享受社交带来的快乐，通过与他人的互动获得能量。无论是陌生场合还是熟悉的环境，你都能游刃有余地应对，这种社交能力让你在校园生活中如鱼得水。',
        negative: '你更倾向于独处，享受安静的个人空间。在社交场合中，你可能会感到疲惫，更愿意与少数亲密朋友深入交流。你不是不喜欢社交，而是更注重质量而非数量。你的内心世界丰富，善于自我反思，这种特质让你在需要专注和深度思考的事情上表现出色。',
        neutral: '你能在社交与独处间找到完美的平衡。在需要交流时，你能大方得体地与人互动；在需要独处时，你也能享受安静的个人时光。这种灵活的社交模式让你既不内耗，也不过度张扬。'
      },
      L: {
        positive: '你对学习充满热情，追求卓越和自我提升。你有明确的目标和计划，愿意为了理想付出努力。在学业上你精益求精，不仅满足于课堂知识，还会主动探索更多领域。这种积极进取的态度让你在竞争中脱颖而出，成为他人眼中的榜样。',
        negative: '你对学习保持着一种轻松的态度，更注重过程而非结果。你相信学习应该是一种乐趣，而不是压力。你善于在学习和生活之间找到平衡，不会为了成绩过度焦虑。这种心态让你在面对挑战时更加从容，也让你的大学生活更加丰富多彩。',
        neutral: '你对待学习的态度既不过分焦虑也不完全躺平。你能根据实际情况调整自己的学习节奏，既能为了目标努力奋斗，也能在适当的时候放松自己。这种张弛有度的状态是最佳的学习方式。'
      },
      D: {
        positive: '你是一个有条理、有计划的人，做事认真负责，追求效率和质量。你善于规划时间，制定目标，并严格执行。在团队中，你往往是可靠的领导者或执行者，能够有条不紊地完成任务。这种自律和责任感让你在各种场合都能赢得他人的信任。',
        negative: '你更倾向于随遇而安，享受灵活自由的生活方式。你不喜欢被严格的计划束缚，善于随机应变，在变化中找到乐趣。虽然有时会显得有些拖延，但你总能在最后时刻完成任务，并且常常能带来意想不到的创意。这种随性的态度让你在面对压力时更加从容。',
        neutral: '你做事既有计划性又不失灵活性。在面对重要任务时，你能按部就班地完成；在遇到突发情况时，你也能随心所欲地应对。你不仅能掌控自己的生活节奏，还能享受其中的乐趣。'
      },
      W: {
        positive: '你是一个理性务实的人，善于分析问题，做出明智的决策。你关注现实，注重实际效果，不会被情绪或幻想所左右。在面对困难时，你能够保持冷静，找到解决问题的方法。这种理性思维让你在学习和生活中都能做出正确的选择。',
        negative: '你是一个感性细腻的人，注重内心感受，富有同理心和创造力。你善于理解他人的情感，也能敏锐地感知自己的情绪变化。虽然有时会有些多愁善感，但你的情感丰富让你在艺术、文学等领域有独特的见解。这种感性特质让你的生活更加丰富多彩，也让你成为一个温暖的朋友。',
        neutral: '你是一个感性与理性并重的人。在做决定时，你既会考虑实际情况和客观规律，也会兼顾自己和他人的情感需求。这种平衡的内心世界让你在面对复杂问题时总能做出最合适的选择。'
      }
    };
    return interpretations[dimension][direction];
  };

  // 自动提交结果
  useEffect(() => {
    if (testCompleted && testResult && !isSubmitting) {
      setIsSubmitting(true);
      saveResultToSupabase(nickname, testResult).then(() => {
        setIsSubmitting(false);
      });
    }
  }, [testCompleted, testResult]);

  // 首页
  if (!showStartTest) {
    return (
      <div className="test-page">
        <h1 className="test-title">CBTI-大学生人格测试(jxau版)</h1>
        <img src={logoImg} alt="CBTI Logo" className="cbti-logo" />
        <div className="auth-container">
          <div className="auth-card">
            <h2>欢迎参与测试</h2>
            <p className="auth-description">请先填写昵称，然后开始测试</p>
            
            <div className="nickname-input">
              <input
                type="text"
                placeholder="请输入昵称"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="nickname-field"
              />
            </div>
            
            <button 
              className="start-test-button"
              onClick={handleStartTest}
            >
              开始测试
            </button>
          </div>
        </div>
        
        {/* 弹窗 */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p>{modalMessage}</p>
              <button onClick={() => setShowModal(false)}>确定</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 结果页
  if (testCompleted) {
    return (
      <div className="test-result">
        <div className="result-container">
          <h1 className="result-title">你的人格类型是:</h1>
          <div className="personality-card">
            <div className="personality-header">
              <h2 className="personality-name">{testResult.personality.name}</h2>
              <h3 className="personality-code">{testResult.personality.code}</h3>
            </div>
            <div className="personality-icon">
              <div dangerouslySetInnerHTML={{ __html: personalityIcons[testResult.personality.code as keyof typeof personalityIcons] }} />
            </div>
            <p className="personality-description">{testResult.personality.description}</p>
            <div className="dimension-results">
              <div className="dimension">
                <div className="dimension-header">
                  <h3>社交维度</h3>
                  <div className="dimension-icon">👥</div>
                </div>
                <p className="dimension-tendency">倾向: {testResult.dimensionResults.S.direction === 'neutral' ? '均衡' : testResult.dimensionResults.S.direction === 'positive' ? '外放喧嚣' : '独处缄默'}</p>
                <p className="dimension-interpretation">{getDimensionInterpretation('S', testResult.dimensionResults.S.direction)}</p>
              </div>
              <div className="dimension">
                <div className="dimension-header">
                  <h3>学习维度</h3>
                  <div className="dimension-icon">📚</div>
                </div>
                <p className="dimension-tendency">倾向: {testResult.dimensionResults.L.direction === 'neutral' ? '均衡' : testResult.dimensionResults.L.direction === 'positive' ? '激进内卷' : '虚无摆烂'}</p>
                <p className="dimension-interpretation">{getDimensionInterpretation('L', testResult.dimensionResults.L.direction)}</p>
              </div>
              <div className="dimension">
                <div className="dimension-header">
                  <h3>行事维度</h3>
                  <div className="dimension-icon">⚡</div>
                </div>
                <p className="dimension-tendency">倾向: {testResult.dimensionResults.D.direction === 'neutral' ? '均衡' : testResult.dimensionResults.D.direction === 'positive' ? '秩序自律' : '混沌拖延'}</p>
                <p className="dimension-interpretation">{getDimensionInterpretation('D', testResult.dimensionResults.D.direction)}</p>
              </div>
              <div className="dimension">
                <div className="dimension-header">
                  <h3>内心维度</h3>
                  <div className="dimension-icon">❤️</div>
                </div>
                <p className="dimension-tendency">倾向: {testResult.dimensionResults.W.direction === 'neutral' ? '均衡' : testResult.dimensionResults.W.direction === 'positive' ? '现实功利' : '感性内耗'}</p>
                <p className="dimension-interpretation">{getDimensionInterpretation('W', testResult.dimensionResults.W.direction)}</p>
              </div>
            </div>
            {isSubmitting && (
              <div className="submitting-status">
                <div className="loading"></div>
                <p>正在提交结果...</p>
              </div>
            )}
            <div className="result-actions">
              <button 
                className="share-button"
                onClick={() => handleShareClick(testResult.personality.name, testResult.personality.code)}
              >
                分享给好友
              </button>
              <button 
                className="restart-button"
                onClick={() => {
                  setTestCompleted(false);
                  setCurrentQuestionIndex(0);
                  setAnswers(Array(questions.length).fill(null));
                  setIsSubmitting(false);
                }}
              >
                重新测试
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 答题页
  return (
    <div className="test-page">
      <h1 className="test-title">CBTI-大学生人格测试(jxau版)</h1>
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
        <span className="progress-text">
          {currentQuestionIndex + 1} / {questions.length}
        </span>
      </div>
      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
      />
      <div className="navigation">
        <button
          className="nav-button previous"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          上一题
        </button>
        <button
          className="nav-button next"
          onClick={handleNext}
        >
          {currentQuestionIndex === questions.length - 1 ? '提交' : '下一题'}
        </button>
      </div>
    </div>
  );
};

export default TestPage;