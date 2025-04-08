export interface IQuestion {
  questionID: number,
  questionText: string;
  answers: [answer1: string, answer2: string, answer3: string, answer4: string],
  userAnswer: number,
  correctAnswered: boolean,
}
