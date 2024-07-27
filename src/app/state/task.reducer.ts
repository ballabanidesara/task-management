import { createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.model';
import {
  loadMockTasksSuccess,
  loadMockTasksFailure,
  clearTasksSuccess,
  clearTasksFailure,
  addTaskSuccess,
  addTaskFailure,
  openEditTaskDialog,
  removeTaskFailure,
  removeTaskSuccess
} from './task.actions';

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
  on(loadMockTasksFailure, (state, { error }) => ({ ...state, error })),
  on(clearTasksSuccess, (state) => ({ ...state, tasks: [] })),
  on(clearTasksFailure, (state, { error }) => ({ ...state, error })),
  on(addTaskSuccess, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
  on(addTaskFailure, (state, { error }) => ({ ...state, error })),
  on(openEditTaskDialog, (state, { task }) => ({ ...state, selectedTask: task })),
  on(removeTaskSuccess, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== taskId)
  })),
  on(removeTaskFailure, (state, { error }) => ({ ...state, error }))

);
