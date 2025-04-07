import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Category } from '../../../interfaces/category';
import { Topic } from '../../../interfaces/topic';

@Component({
  selector: 'app-quiz-selection',
  imports: [FormsModule],
  templateUrl: './quiz-selection.component.html',
  styleUrl: './quiz-selection.component.css',
})
export class QuizSelectionComponent implements OnInit {
  @Output() start = new EventEmitter();

  private quizService = inject(QuizService);
  private destroyRef = inject(DestroyRef);

  questionAmount: number = 10;

  categories = signal<{
    categories: Category[];
  }>({ categories: [{ category: 'Keine verfügbar!', category_id: 0 }] });
  categorySelected = false;
  selectedCategory: string = '';
  selectedCategoryId: number = 0;
  selectedCategoryName = '';

  topics = signal<{
    topics: Topic[];
  }>({ topics: [{ category_id: -1, topic: 'Keine gefunden!', topic_id: 0 }] });
  availableTopics: Topic[] = [
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
      next: (topics: { topics: Topic[] }) => {
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
        .categories.forEach((category: Category) => {
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
      this.topics.call(this.topics).topics.forEach((topic: Topic) => {
        if (topic.topic_id === this.selectedTopicId) {
          this.selectedTopicName = topic.topic;
        }
      });
    }
  }

  async startCategory() {
    await this.quizService.fetchQuestions(
      'category',
      this.selectedCategoryId,
      this.questionAmount
    );

    // SET quizStarted in quiz-page to true
    this.start.emit();
  }

  startTopic() {}

  startFull() {}
}
