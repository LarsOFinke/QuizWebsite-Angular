import { Component, inject, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz-game',
  imports: [],
  templateUrl: './quiz-game.component.html',
  styleUrl: './quiz-game.component.css',
})
export class QuizGameComponent implements OnInit {
  private quizService = inject(QuizService);

  questionList: [] = [];
  question: string = '';
  answer1: string = '';
  answer2: string = '';
  answer3: string = '';
  answer4: string = '';

  constructor() {}

  ngOnInit(): void {
    this.questionList = this.quizService.questions;
    console.log(this.questionList);
  }

  answerQuestion(choice: number) {
    console.log(choice);
  }
}
