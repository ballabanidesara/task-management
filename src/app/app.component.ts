import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Store } from '@ngrx/store';
import { clearTasks, loadMockTasks } from './state/task.actions';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskStatusChartComponent } from './components/task-status-chart/task-status-chart.component';
import { Task } from './models/task.model';
import { selectAllTasks } from './state/task.selectors';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tmb-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, MatSnackBarModule, TaskStatusChartComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  vh = window.innerHeight * 0.01;
  isHomePage = false;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    document.documentElement.style.setProperty('--vh', `${this.vh}px`);
    window.addEventListener('resize', () => {
      this.vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${this.vh}px`);
    });

    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/';
    });

    this.tasks$ = this.store.select(selectAllTasks);
  }


  addMockTasks() {
    this.store.dispatch(loadMockTasks());
  }


  clearTasks() {
    this.store.dispatch(clearTasks());
  }
}
