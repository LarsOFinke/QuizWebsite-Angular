import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { IQuestion } from '../../../interfaces/i-question';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-quiz-results',
  imports: [NgIf],
  templateUrl: './quiz-results.component.html',
  styleUrl: './quiz-results.component.css',
})
export class QuizResultsComponent implements OnInit {
  private quizService = inject(QuizService);

  @Output() restart = new EventEmitter();

  result: number = 0;
  questionList: IQuestion[] = [];

  ngOnInit(): void {
    this.result = this.quizService.result.result;
    this.questionList = this.quizService.result.question_list;
  }

  again() {
    this.restart.emit();
  }
}
