import React from 'react';

interface QuestionCardProps {
  question: {
    id: number;
    text: string;
    options: {
      A: string;
      B: string;
      C: string;
    };
  };
  selectedAnswer: 'A' | 'B' | 'C' | null;
  onSelectAnswer: (answer: 'A' | 'B' | 'C') => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedAnswer, onSelectAnswer }) => {
  return (
    <div className="question-card">
      <h3 className="question-number">第 {question.id} 题</h3>
      <p className="question-text">{question.text}</p>
      <div className="options">
        <div 
          className={`option ${selectedAnswer === 'A' ? 'selected' : ''}`}
          onClick={() => onSelectAnswer('A')}
        >
          <span className="option-letter">A</span>
          <span className="option-text">{question.options.A}</span>
        </div>
        <div 
          className={`option ${selectedAnswer === 'B' ? 'selected' : ''}`}
          onClick={() => onSelectAnswer('B')}
        >
          <span className="option-letter">B</span>
          <span className="option-text">{question.options.B}</span>
        </div>
        <div 
          className={`option ${selectedAnswer === 'C' ? 'selected' : ''}`}
          onClick={() => onSelectAnswer('C')}
        >
          <span className="option-letter">C</span>
          <span className="option-text">{question.options.C}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;