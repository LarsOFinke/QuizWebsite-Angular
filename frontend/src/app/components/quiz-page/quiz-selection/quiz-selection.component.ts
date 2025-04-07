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
  }>({ categories: [{ category: 'Keine verfügbar!', category_id: -1 }] });
  categorySelected = false;
  selectedCategory: string = '';
  selectedCategoryId: number = 0;
  selectedCategoryName = '';

  topics = signal<{
    topics: [{ topic: string; topic_id: number }];
  }>({ topics: [{ topic: 'Keine gefunden!', topic_id: -1 }] });
  availableTopics: [{ topic: string; topic_id: number }] = [
    { topic: 'Keine verfügbar!', topic_id: 0 },
  ];
  topicSelected = false;
  selectedTopic: string = '';
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
      next: (topics: { topics: [{ topic: string; topic_id: number }] }) => {
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

  onCategoryChange(selectedValue: string): void {
    this.selectedCategoryId = parseInt(selectedValue);
    this.categorySelected = true;

    if (this.categorySelected) {
      this.categories
        .call(this.categories)
        .categories.forEach(
          (category: { category: string; category_id: number }) => {
            if (category.category_id === this.selectedCategoryId) {
              this.selectedCategoryName = category.category;

              console.log(this.topics.call(this.topics).topics);
              console.log(this.availableTopics);
            }
          }
        );
    }
  }

  onTopicChange(selectedValue: string): void {
    this.selectedTopicId = parseInt(selectedValue);
    this.topicSelected = true;

    if (this.topicSelected) {
      this.topics
        .call(this.topics)
        .topics.forEach((topic: { topic: string; topic_id: number }) => {
          if (topic.topic_id === this.selectedTopicId) {
            this.selectedTopicName = topic.topic;
          }
        });
    }
  }

  startCategory() {}

  startTopic() {}

  startFull() {}
}
