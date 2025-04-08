import { Component, DestroyRef, inject, signal } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { ICategory } from '../../interfaces/i-category';
import { ITopic } from '../../interfaces/i-topic';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-highscores-page',
  imports: [FormsModule],
  templateUrl: './highscores-page.component.html',
  styleUrl: './highscores-page.component.css',
})
export class HighscoresPageComponent {
  private quizService = inject(QuizService);
  private destroyRef = inject(DestroyRef);

  categories = signal<{
    categories: ICategory[];
  }>({ categories: [{ category: 'Keine verfügbar!', category_id: 0 }] });
  categorySelected = false;
  selectedCategory: string = '';
  selectedCategoryId: number = 0;
  selectedCategoryName = '';

  topics = signal<{
    topics: ITopic[];
  }>({ topics: [{ category_id: -1, topic: 'Keine gefunden!', topic_id: 0 }] });
  availableTopics: ITopic[] = [
    { category_id: -1, topic: 'Keine verfügbar!', topic_id: 0 },
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
    const categories = this.quizService.fetchCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
    });

    const topics = this.quizService.fetchTopics().subscribe({
      next: (topics: { topics: ITopic[] }) => {
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

  onCategoryChange(selectedValue: string): void {
    this.selectedCategoryId = parseInt(selectedValue);
    this.categorySelected = true;

    if (this.categorySelected) {
      this.categories
        .call(this.categories)
        .categories.forEach((category: ICategory) => {
          if (category.category_id === this.selectedCategoryId) {
            this.selectedCategoryName = category.category;

            this.availableTopics = [
              { category_id: -1, topic: 'Bitte wählen!', topic_id: 0 },
            ];
            this.availableTopics.pop();
            this.topics.call(this.topics).topics.forEach((topic) => {
              if (topic.category_id === this.selectedCategoryId) {
                this.availableTopics.push(topic);
              }
            });
          }
        });
    }
  }

  onTopicChange(selectedValue: string): void {
    this.selectedTopicId = parseInt(selectedValue);
    this.topicSelected = true;

    if (this.topicSelected) {
      this.topics.call(this.topics).topics.forEach((topic: ITopic) => {
        if (topic.topic_id === this.selectedTopicId) {
          this.selectedTopicName = topic.topic;
        }
      });
    }
  }
}
