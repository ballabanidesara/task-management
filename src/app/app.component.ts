import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { StorageSchema } from './models/storage-schema.model';
import { StorageService } from './services/storage.service';
import { MatButtonModule } from '@angular/material/button';
import { mockTasks } from './constants/constants';
import { HeaderComponent } from './components/header/header.component';
import { filter } from 'rxjs';

@Component({
  selector: 'tmb-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  mockedTasks = mockTasks;
  vh = window.innerHeight * 0.01;
  isTaskPage = false;

  constructor(private storage: StorageService<StorageSchema>, private router: Router) {}

  ngOnInit() {
    
    document.documentElement.style.setProperty('--vh', `${this.vh}px`);
    window.addEventListener('resize', () => {
      this.vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${this.vh}px`);
    });
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isTaskPage = this.router.url === '/task';
      });
    
  }

  addMockTasks() {
    const tasks = this.storage.getItem('tasks') || [];
    this.storage.setItem('tasks', [...tasks, ...this.mockedTasks()]);
  }

  clearTasks() {
    this.storage.clear();
  }
}
