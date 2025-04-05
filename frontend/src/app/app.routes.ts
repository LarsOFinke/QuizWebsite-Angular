import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { MainMenuPageComponent } from './components/main-menu-page/main-menu-page.component';
import { ImpressumPageComponent } from './components/impressum-page/impressum-page.component';
import { ResultsPageComponent } from './components/results-page/results-page.component';
import { HighscoresPageComponent } from './components/highscores-page/highscores-page.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';

export const routes: Routes = [
    {path: "", component: LoginPageComponent},
    {path: "register", component: RegisterPageComponent},
    {path: "main-menu", component: MainMenuPageComponent},
    {path: "quiz", component: QuizPageComponent},
    {path: "results", component: ResultsPageComponent},
    {path: "highscores", component: HighscoresPageComponent},
    {path: "impressum", component: ImpressumPageComponent},
];
