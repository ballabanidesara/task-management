import { createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.model';
import { loadMockTasksSuccess, loadMockTasksFailure } from './task.actions';


// Define the initial state
export interface TaskState {
  tasks: Task[];
  error: any;
}

export const initialState: TaskState = {
  tasks: [],
  error: null
};

export const taskReducer = createReducer(
  initialState,
  on(loadMockTasksSuccess, (state, { tasks }) => ({ ...state, tasks })),
  on(loadMockTasksFailure, (state, { error }) => ({ ...state, error }))
);
