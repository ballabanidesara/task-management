import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { StorageService } from './services/storage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { mockTasks } from './constants/constants';
import { HeaderComponent } from './components/header/header.component';

import { Store } from '@ngrx/store';
import { loadMockTasks } from './state/task.actions';
import { StorageSchema } from './models/storage-schema.model';


@Component({
  selector: 'tmb-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  mockedTasks = mockTasks;
  vh = window.innerHeight * 0.01;
  isTaskPage = false;

  constructor(private storage: StorageService<StorageSchema>, private router: Router, private store: Store) { }

  ngOnInit() {
    document.documentElement.style.setProperty('--vh', `${this.vh}px`);
    window.addEventListener('resize', () => {
      this.vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${this.vh}px`);
    });

    this.router.events.subscribe(() => {
      this.isTaskPage = this.router.url === '/task';
    });
  }

  // addMockTasks() {
  //   const tasks = this.storage.getItem('tasks') || [];
  //   this.storage.setItem('tasks', [...tasks, ...this.mockedTasks()]);
  // }

  addMockTasks() {
    this.store.dispatch(loadMockTasks());
  }

  clearTasks() {
    this.storage.clear();
  }
}
