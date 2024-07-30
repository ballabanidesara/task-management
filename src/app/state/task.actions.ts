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

// Action to clear all tasks
export const clearTasks = createAction('[Task] Clear Tasks');

// Action for successful clearing of tasks
export const clearTasksSuccess = createAction('[Task] Clear Tasks Success');

// Action for failed clearing of tasks
export const clearTasksFailure = createAction('[Task] Clear Tasks Failure', props<{ error: any }>());

// Action to open the add task dialog
export const openAddTaskDialog = createAction('[Task] Open Add Task Dialog');

// Action for successful addition of a task
export const addTaskSuccess = createAction('[Task] Add Task Success', props<{ task: Task }>());

// Action for failed addition of a task
export const addTaskFailure = createAction('[Task] Add Task Failure', props<{ error: any }>());

// Action to view the task
export const openTaskDetails = createAction('[Task] Open Task Details', props<{ task: Task }>());

// Action to open editTaskDialog
export const openEditTaskDialog = createAction('[Task] Open Edit Task Dialog', props<{ task: Task }>());


// Action to remove the task 
export const removeTask = createAction('[Task] Remove Task', props<{ taskId: string }>());

export const removeTaskSuccess = createAction('[Task] Remove Task Success', props<{ taskId: string }>());

export const removeTaskFailure = createAction('[Task] Remove Task Failure', props<{ error: any }>());
