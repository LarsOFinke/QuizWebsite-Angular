import { Component, inject } from '@angular/core';
import { QuizSelectionComponent } from './quiz-selection/quiz-selection.component';
import { QuizGameComponent } from './quiz-game/quiz-game.component';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-page',
  imports: [QuizSelectionComponent, QuizGameComponent, QuizResultsComponent],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.css',
})
export class QuizPageComponent {
  private quizService = inject(QuizService);

  quizStarted: boolean = false;
  quizFinished: boolean = false;

  startQuiz() {
    this.quizStarted = true;
  }

  finishQuiz() {
    this.quizFinished = true;
  }
}
