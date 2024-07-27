import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, tap, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../services/storage.service';
import { StorageSchema } from '../models/storage-schema.model';
import {
  clearTasks,
  clearTasksSuccess,
  clearTasksFailure,
  loadMockTasks,
  loadMockTasksFailure,
  loadMockTasksSuccess,
  openAddTaskDialog,
  addTaskSuccess,
  addTaskFailure
} from './task.actions';
import { Task, TaskPriority, TaskStatus } from '../models/task.model';
import { EditTaskDialogComponent } from '../components/edit-task-dialog/edit-task-dialog.component';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private storage: StorageService<StorageSchema>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  loadMockTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMockTasks),
      switchMap(() => {
        try {
          const tasks = this.storage.getItem('tasks') || [];
          const mockedTasks = this.mockedTasks();
          this.storage.setItem('tasks', [...tasks, ...mockedTasks]);
          return of(loadMockTasksSuccess({ tasks: [...tasks, ...mockedTasks] }));
        } catch (error) {
          return of(loadMockTasksFailure({ error }));
        }
      })
    )
  );

  clearTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clearTasks),
      switchMap(() => {
        try {
          this.storage.clear();
          return of(clearTasksSuccess());
        } catch (error) {
          return of(clearTasksFailure({ error }));
        }
      })
    )
  );

  clearTasksSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(clearTasksSuccess),
        tap(() => {
          this.snackBar.open('Tasks cleared successfully', 'Close', {
            duration: 500,
          });
        })
      ),
    { dispatch: false }
  );

  openAddTaskDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openAddTaskDialog),
      switchMap(() => {
        const dialogRef = this.dialog.open(EditTaskDialogComponent, {
          width: '400px',
          data: { isEdit: false },
          disableClose: true,
        });

        return dialogRef.afterClosed().pipe(
          map((result) => {
            if (result) {
              return addTaskSuccess({ task: result });
            } else {
              throw new Error('Task addition canceled');
            }
          }),
          catchError((error) => of(addTaskFailure({ error })))
        );
      })
    )
  );

  private mockedTasks(): Task[] {
    return [
      {
        id: '1',
        title: 'Mock Task 1',
        status: TaskStatus.Backlog,
        priority: TaskPriority.High,
        assignee: 'Ana Lika',
        description: 'This is a mock task description',
        createdAt: null,
        dueDate: '2024-08-01'
      },
      {
        id: '2',
        title: 'Mock Task 2',
        status: TaskStatus.ToDo,
        priority: TaskPriority.Medium,
        assignee: 'Lea Osmani',
        description: 'This is another mock task description',
        createdAt: '2024-07-01',
        dueDate: '2024-07-15'
      },
      {
        id: '3',
        title: 'Mock Task 3',
        status: TaskStatus.InProgress,
        priority: TaskPriority.High,
        assignee: 'Sara Ballabani',
        description: 'This is a mock task description',
        createdAt: null,
        dueDate: '2024-05-01'
      },
      {
        id: '4',
        title: 'Mock Task 4',
        status: TaskStatus.Completed,
        priority: TaskPriority.Medium,
        assignee: 'Ana Osmani',
        description: 'This is another mock task description',
        createdAt: '2024-07-01',
        dueDate: '2024-03-15'
      },
    ];
  }
}
