import { Component, inject, OnInit, signal } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz-game',
  imports: [],
  templateUrl: './quiz-game.component.html',
  styleUrl: './quiz-game.component.css',
})
export class QuizGameComponent implements OnInit {
  private quizService = inject(QuizService);

  questionList: any = [];
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

  rotateQuestion() {
    this.question.set(
      this.questionList[this.currentQuestionIndex].questionText
    );
    this.answer1.set(
      this.questionList[this.currentQuestionIndex].answers[0]
    );
    this.answer2.set(
      this.questionList[this.currentQuestionIndex].answers[1]
    );
    this.answer3.set(
      this.questionList[this.currentQuestionIndex].answers[2]
    );
    this.answer4.set(
      this.questionList[this.currentQuestionIndex].answers[3]
    );
  }

  answerQuestion(choice: number) {

    this.rotateQuestion();
    this.currentQuestionIndex++;
  }
}
