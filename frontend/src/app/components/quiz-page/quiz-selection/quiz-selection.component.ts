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
  selectedCategoryId = 0;
  selectedCategoryName = '';

  topics = signal<{
    topics: [{ topic: string; topic_id: number }];
  }>({ topics: [{ topic: 'Keine gefunden!', topic_id: -1 }] });
  topicSelected = false;
  selectedTopicId = 0;
  selectedTopicName = '';

  isFetching = signal(false);
  error = signal('');

  constructor() {}

  ngOnInit() {
    this.isFetching.set(true);
    const categories = this.selectionService.fetchCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
    });

    const topics = this.selectionService.fetchTopics().subscribe({
      next: (topics) => {
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
      this.categories
        .call(this.categories)
        .categories.forEach(
          (category: { category: string; category_id: number }) => {
            if (category.category_id === this.selectedCategoryId) {
              this.selectedCategoryName = category.category;
            }
          }
        );
    }
  }

  startTopic() {
    if (this.topicSelected) {
      this.topics
        .call(this.topics)
        .topics.forEach(
          (topic: { topic: string; topic_id: number }) => {
            if (topic.topic_id === this.selectedCategoryId) {
              this.selectedCategoryName = topic.topic;
            }
          }
        );
    }
  }

  startFull() {}
}
