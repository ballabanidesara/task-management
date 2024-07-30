import { NgxMatDateFormats } from '@angular-material-components/datetime-picker';
import { TaskPriority, TaskStatus } from '../models/task.model';
import { v4 } from 'uuid';
import moment from 'moment';

export const DATETIME_FORMAT: NgxMatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY, HH:mm',
  },
  display: {
    dateInput: 'DD/MM/YYYY, HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMM YYYY',
  },
};

export const DIALOG_WIDTH = '640px';

export const TASK_STATUS_LABELS = ['Backlog','To Do', 'In Progress', 'Completed'];

export const TASK_PRIORITY_LABELS = ['High', 'Medium', 'Low'];

export const DATETIME_OUTPUT_FORMAT = 'DD.MM.YYYY HH:mm';

