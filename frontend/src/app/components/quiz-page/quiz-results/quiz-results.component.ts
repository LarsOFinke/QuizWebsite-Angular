import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { IQuestion } from '../../../interfaces/i-question';

@Component({
  selector: 'app-quiz-results',
  imports: [],
  templateUrl: './quiz-results.component.html',
  styleUrl: './quiz-results.component.css',
})
export class QuizResultsComponent implements OnInit {
  private quizService = inject(QuizService);

  result: number = 0;
  questionList: IQuestion[] = [];

  ngOnInit(): void {
    this.result = this.quizService.result.result;
    this.questionList = this.quizService.result.question_list;
  }
}
