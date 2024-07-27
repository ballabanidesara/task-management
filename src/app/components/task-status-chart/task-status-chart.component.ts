import { ChangeDetectionStrategy, Component, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models/task.model';
import { selectBacklogTasks, selectToDoTasks, selectInProgressTasks, selectCompletedTasks, selectAllTasks } from 'src/app/state/task.selectors';
import { Observable, Subscription } from 'rxjs';
import { Chart, DoughnutController, CategoryScale, ArcElement, Tooltip, Legend, ChartConfiguration, ChartData } from 'chart.js';
import { map } from 'rxjs/operators';

@Component({
  selector: 'tmb-task-status-chart',
  standalone: true,
  templateUrl: './task-status-chart.component.html',
  styleUrls: ['./task-status-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
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

  constructor(private store: Store) {}

  ngOnInit() {
    this.totalTasks$ = this.store.select(selectAllTasks).pipe(map(tasks => tasks.length));
    this.backlogTasks$ = this.store.select(selectBacklogTasks).pipe(map(tasks => tasks.length));
    this.todoTasks$ = this.store.select(selectToDoTasks).pipe(map(tasks => tasks.length));
    this.inProgressTasks$ = this.store.select(selectInProgressTasks).pipe(map(tasks => tasks.length));
    this.completedTasks$ = this.store.select(selectCompletedTasks).pipe(map(tasks => tasks.length));
  }

  ngAfterViewInit() {
    this.renderChart();
    this.subscribeToData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  renderChart() {
    // Register chart components
    Chart.register(DoughnutController, CategoryScale, ArcElement, Tooltip, Legend);

    const chartData: ChartData<'doughnut', number[], string> = {
      labels: ['Backlog', 'To Do', 'In Progress', 'Completed'],
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

    // Create chart with initial empty data
    this.chart = new Chart('taskStatusChart', chartConfig);
  }

  subscribeToData() {
    this.subscriptions.add(this.backlogTasks$.subscribe(data => {
      this.chart.data.datasets[0].data[0] = data;
      this.chart.update();
    }));
    this.subscriptions.add(this.todoTasks$.subscribe(data => {
      this.chart.data.datasets[0].data[1] = data;
      this.chart.update();
    }));
    this.subscriptions.add(this.inProgressTasks$.subscribe(data => {
      this.chart.data.datasets[0].data[2] = data;
      this.chart.update();
    }));
    this.subscriptions.add(this.completedTasks$.subscribe(data => {
      this.chart.data.datasets[0].data[3] = data;
      this.chart.update();
    }));
  }
}
