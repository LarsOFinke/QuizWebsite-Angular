import { Component } from '@angular/core';
import { QuizSelectionComponent } from './quiz-selection/quiz-selection.component';

@Component({
  selector: 'app-quiz-page',
  imports: [QuizSelectionComponent],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.css',
})
export class QuizPageComponent {
  quizStarted: boolean = false;

  startQuiz() {
    this.quizStarted = true;
  }
}
