import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { IQuestion } from '../../../interfaces/i-question';

@Component({
  selector: 'app-quiz-game',
  imports: [],
  templateUrl: './quiz-game.component.html',
  styleUrl: './quiz-game.component.css',
})
export class QuizGameComponent implements OnInit {
  private quizService = inject(QuizService);

  @Output() end = new EventEmitter();

  questionList: IQuestion[] = [];
  currentQuestionIndex: number = 0;
  question = signal('');
  answer1 = signal('');
  answer2 = signal('');
  answer3 = signal('');
  answer4 = signal('');

  ngOnInit(): void {
    this.questionList = this.quizService.questions.questions;
    console.log(this.questionList);

    this.rotateQuestion();
  }

  async endQuiz() {
    await this.quizService.processQuizEnd();
    this.end.emit();
  }

  rotateQuestion() {
    this.question.set(
      this.questionList[this.currentQuestionIndex].questionText
    );
    this.answer1.set(this.questionList[this.currentQuestionIndex].answers[0]);
    this.answer2.set(this.questionList[this.currentQuestionIndex].answers[1]);
    this.answer3.set(this.questionList[this.currentQuestionIndex].answers[2]);
    this.answer4.set(this.questionList[this.currentQuestionIndex].answers[3]);
  }

  answerQuestion(choice: number) {
    this.quizService.setPlayerAnswer(this.currentQuestionIndex, choice);
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questionList.length) {
      this.endQuiz();
    } else {
      this.rotateQuestion();
    }
  }
}
