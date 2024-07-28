import { Routes } from '@angular/router';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { LoginComponent } from './components/log-in/log-in.component';
import { SignupComponent } from './components/sign-up/sign-up.component';


export const routes: Routes = [
  { path: '', component: TaskBoardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
