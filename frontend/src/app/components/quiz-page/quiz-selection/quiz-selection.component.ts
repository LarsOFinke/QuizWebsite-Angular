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
  topics: string[] = [];

  isFetching = signal(false);
  error = signal('');

  constructor() {}

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.selectionService.fetchCategories().subscribe({
      next: (categories) => {
        console.log(categories);
        this.categories.set(categories);
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onRangeChange(newValue: number) {
    this.questionAmount = newValue;
  }

  startCategory() {}

  startTopic() {}

  startFull() {}
}

// function removeCategoryOptions() {
//   const category_options = document.querySelectorAll('#category > option');
//   category_options.forEach((e) => e.remove());
// }

// function removeTopicOptions() {
//   const topic_options = document.querySelectorAll('#topic > option');
//   topic_options.forEach((e) => e.remove());
// }

// function addEmptyCategoryOption() {
//   const new_option = document.createElement('option');
//   document
//     .getElementById('category')
//     .insertAdjacentElement('afterbegin', new_option);
// }

// function addEmptyTopicOption() {
//   const new_option = document.createElement('option');
//   document
//     .getElementById('topic')
//     .insertAdjacentElement('afterbegin', new_option);
// }

// function createTopicOptions(event) {
//   const cat_def_opt = document.getElementById('cat_def_opt');
//   if (cat_def_opt !== null) {
//     cat_def_opt.remove();
//   }

//   const category_id = event.target.value;

//   const old_options = document.querySelectorAll('#topic > option');
//   old_options.forEach((e) => e.remove());

//   addEmptyTopicOption();

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
