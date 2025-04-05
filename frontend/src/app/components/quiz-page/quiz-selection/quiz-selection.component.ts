import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-selection',
  imports: [FormsModule],
  templateUrl: './quiz-selection.component.html',
  styleUrl: './quiz-selection.component.css',
})
export class QuizSelectionComponent {
  questionAmount: number = 10;

  onRangeChange(newValue: number) {
    this.questionAmount = newValue;
  }

  updateTopics() {}

  startCategory() {}

  startTopic() {}

  startFull() {}
}
