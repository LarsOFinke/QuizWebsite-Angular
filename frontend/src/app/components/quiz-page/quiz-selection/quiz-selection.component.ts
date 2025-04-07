import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectionService } from '../../../services/api/selection.service';

@Component({
  selector: 'app-quiz-selection',
  imports: [FormsModule],
  templateUrl: './quiz-selection.component.html',
  styleUrl: './quiz-selection.component.css',
})
export class QuizSelectionComponent implements OnInit {
  private selectionService = inject(SelectionService);
  private destroyRef = inject(DestroyRef);

  questionAmount: number = 10;
  categories = signal<{
    categories: [{ category: string; category_id: number }];
  }>({ categories: [{ category: 'Keine gefunden!', category_id: -1 }] });
  categorySelected = false;
  topics = signal<{
    topics: [{ topic: string; topic_id: number }];
  }>({ topics: [{ topic: 'Keine gefunden!', topic_id: -1 }] });
  topicSelected = false;

  isFetching = signal(false);
  error = signal('');

  constructor() {}

  ngOnInit() {
    this.isFetching.set(true);
    const categories = this.selectionService.fetchCategories().subscribe({
      next: (categories) => {
        console.log(categories);
        this.categories.set(categories);
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
    });

    const topics = this.selectionService.fetchTopics().subscribe({
      next: (topics) => {
        console.log(topics);
        this.topics.set(topics);
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      categories.unsubscribe();
      topics.unsubscribe();
    });
  }

  onRangeChange(newValue: number) {
    this.questionAmount = newValue;
  }

  startCategory() {
    if (this.categorySelected) {
    }
  }

  startTopic() {
    if (this.topicSelected) {
    }
  }

  startFull() {}
}

//   topics.forEach((entry) => {
//     if (entry.category_id === parseInt(category_id)) {
//       let new_option = document.createElement('option');
//       new_option.textContent = entry.topic;
//       new_option.value = entry.topic_id;
//       document
//         .getElementById('topic')
//         .insertAdjacentElement('beforeend', new_option);
//     }
//   });
// }
