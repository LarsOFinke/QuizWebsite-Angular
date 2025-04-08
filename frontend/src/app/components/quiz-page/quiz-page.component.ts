import { Component } from '@angular/core';
import { QuizSelectionComponent } from './quiz-selection/quiz-selection.component';
import { QuizGameComponent } from './quiz-game/quiz-game.component';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';

@Component({
  selector: 'app-quiz-page',
  imports: [QuizSelectionComponent, QuizGameComponent, QuizResultsComponent],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.css',
})
export class QuizPageComponent {
  quizStarted: boolean = false;
  quizFinished: boolean = false;

  startQuiz() {
    this.quizStarted = true;
    this.quizFinished = false;
  }

  finishQuiz() {
    this.quizStarted = false;
    this.quizFinished = true;
  }

  restart() {
    this.quizStarted = false;
    this.quizFinished = false;
  }
}
