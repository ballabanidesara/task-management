import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task.model';

// Action to load mock tasks
export const loadMockTasks = createAction('[Task] Load Mock Tasks');

// Action to handle successful loading of tasks
export const loadMockTasksSuccess = createAction(
  '[Task] Load Mock Tasks Success',
  props<{ tasks: Task[] }>()
);

// Action to handle failed loading of tasks
export const loadMockTasksFailure = createAction(
  '[Task] Load Mock Tasks Failure',
  props<{ error: any }>()
);

export const clearTasks = createAction('[Task] Clear Tasks');
export const clearTasksSuccess = createAction('[Task] Clear Tasks Success');
export const clearTasksFailure = createAction('[Task] Clear Tasks Failure', props<{ error: any }>());


