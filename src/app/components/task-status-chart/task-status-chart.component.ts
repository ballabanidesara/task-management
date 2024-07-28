import { ChangeDetectionStrategy, Component, Input, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models/task.model';
import { selectBacklogTasks, selectToDoTasks, selectInProgressTasks, selectCompletedTasks, selectAllTasks } from 'src/app/state/task.selectors';
import { Observable, Subscription } from 'rxjs';
import { Chart, DoughnutController, CategoryScale, ArcElement, Tooltip, Legend, ChartConfiguration, ChartData } from 'chart.js';
import { map } from 'rxjs/operators';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tmb-task-status-chart',
  standalone: true,
  templateUrl: './task-status-chart.component.html',
  styleUrls: ['./task-status-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule]
})
export class TaskStatusChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() tasks: Task[] = [];

  totalTasks$!: Observable<number>;
  backlogTasks$!: Observable<number>;
  todoTasks$!: Observable<number>;
  inProgressTasks$!: Observable<number>;
  completedTasks$!: Observable<number>;

  private chart!: Chart<'doughnut', number[], string>;
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store, private translate: TranslateService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.totalTasks$ = this.store.select(selectAllTasks).pipe(map(tasks => tasks.length));
    this.backlogTasks$ = this.store.select(selectBacklogTasks).pipe(map(tasks => tasks.length));
    this.todoTasks$ = this.store.select(selectToDoTasks).pipe(map(tasks => tasks.length));
    this.inProgressTasks$ = this.store.select(selectInProgressTasks).pipe(map(tasks => tasks.length));
    this.completedTasks$ = this.store.select(selectCompletedTasks).pipe(map(tasks => tasks.length));
  }

  ngAfterViewInit() {
    this.loadTranslationsAndRenderChart();
    this.subscribeToData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  loadTranslationsAndRenderChart() {
    this.translate.get(['backlog', 'todo', 'inprogress', 'completed']).subscribe(translations => {
      // Register chart components
      Chart.register(DoughnutController, CategoryScale, ArcElement, Tooltip, Legend);

      const chartData: ChartData<'doughnut', number[], string> = {
        labels: [
          translations['backlog'],
          translations['todo'],
          translations['inprogress'],
          translations['completed']
        ],
        datasets: [{
          data: [0, 0, 0, 0], // Initial empty data
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
        }]
      };

      const chartConfig: ChartConfiguration<'doughnut', number[], string> = {
        type: 'doughnut',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      };

      // Create chart with initial data and translated labels
      this.chart = new Chart('taskStatusChart', chartConfig);
      
      // Ensure change detection to reflect updates
      this.cdr.detectChanges();
    });
  }

  subscribeToData() {
    this.subscriptions.add(this.backlogTasks$.subscribe(data => {
      if (this.chart) {
        this.chart.data.datasets[0].data[0] = data;
        this.chart.update();
      }
    }));
    this.subscriptions.add(this.todoTasks$.subscribe(data => {
      if (this.chart) {
        this.chart.data.datasets[0].data[1] = data;
        this.chart.update();
      }
    }));
    this.subscriptions.add(this.inProgressTasks$.subscribe(data => {
      if (this.chart) {
        this.chart.data.datasets[0].data[2] = data;
        this.chart.update();
      }
    }));
    this.subscriptions.add(this.completedTasks$.subscribe(data => {
      if (this.chart) {
        this.chart.data.datasets[0].data[3] = data;
        this.chart.update();
      }
    }));
  }
}
