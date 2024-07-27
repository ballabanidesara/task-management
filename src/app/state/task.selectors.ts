import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';
import { TaskStatus } from '../models/task.model';

// Define the feature selector for the task state
export const selectTaskState = createFeatureSelector<TaskState>('tasks');

// Selector to get all tasks
export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);

// Additional selectors to get tasks by status
export const selectBacklogTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter(task => task.status === TaskStatus.Backlog)
);

export const selectToDoTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter(task => task.status === TaskStatus.ToDo)
);

export const selectInProgressTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter(task => task.status === TaskStatus.InProgress)
);

export const selectCompletedTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter(task => task.status === TaskStatus.Completed)
);
