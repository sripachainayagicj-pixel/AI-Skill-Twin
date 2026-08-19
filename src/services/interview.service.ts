import type { InterviewQuestion, InterviewResult } from '../types'
import { delay, generateId } from '../utils/formatters'

const QUESTIONS: Record<string, InterviewQuestion[]> = {
  Technical: [
    { id: '1', question: 'Explain the difference between var, let, and const in JavaScript.', type: 'Technical' },
    { id: '2', question: 'What is the virtual DOM and how does React use it?', type: 'Technical' },
    { id: '3', question: 'Describe the concept of Big O notation with examples.', type: 'Technical' },
    { id: '4', question: 'What are RESTful API principles? How does REST differ from GraphQL?', type: 'Technical' },
    { id: '5', question: 'Explain closures in JavaScript with a practical example.', type: 'Technical' },
  ],
  Behavioral: [
    { id: '6', question: 'Tell me about a time you had to meet a tight deadline. How did you handle it?', type: 'Behavioral' },
    { id: '7', question: 'Describe a conflict with a team member and how you resolved it.', type: 'Behavioral' },
    { id: '8', question: 'Give an example of a time you received difficult feedback. What did you do?', type: 'Behavioral' },
  ],
  HR: [
    { id: '9', question: 'Why do you want to work at this company?', type: 'HR' },
    { id: '10', question: 'Where do you see yourself in 5 years?', type: 'HR' },
    { id: '11', question: 'What is your greatest professional strength?', type: 'HR' },
  ],
  Mixed: [
    { id: '1', question: 'Explain the difference between var, let, and const in JavaScript.', type: 'Technical' },
    { id: '6', question: 'Tell me about a time you had to meet a tight deadline.', type: 'Behavioral' },
    { id: '9', question: 'Why do you want to work at this company?', type: 'HR' },
    { id: '2', question: 'What is the virtual DOM and how does React use it?', type: 'Technical' },
    { id: '7', question: 'Describe a conflict with a team member and how you resolved it.', type: 'Behavioral' },
  ],
}

export const interviewService = {
  async getQuestions(type: string, difficulty: string): Promise<InterviewQuestion[]> {
    await delay(800)
    const questions = QUESTIONS[type] || QUESTIONS.Mixed
    const count = difficulty === 'Easy' ? 3 : difficulty === 'Medium' ? 4 : 5
    return questions.slice(0, count).map(q => ({ ...q, id: generateId() }))
  },

  async submitInterview(
    answers: { question: string; answer: string }[]
  ): Promise<InterviewResult> {
    await delay(2000)
    const score = Math.floor(Math.random() * 25) + 65
    return {
      score,
      strengths: [
        'Clear and structured responses',
        'Good use of specific examples',
        'Demonstrated relevant technical knowledge',
      ],
      improvements: [
        'Provide more quantified outcomes in answers',
        'Be more concise — some answers were too long',
        'Research company-specific context more deeply',
      ],
      answers: answers.map((a, i) => ({
        question: a.question,
        answer: a.answer,
        feedback: i % 2 === 0
          ? 'Strong answer — clear, specific, and well-structured.'
          : 'Good foundation, but could include more measurable results.',
      })),
    }
  },
}
