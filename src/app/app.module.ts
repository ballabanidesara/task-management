import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { routes } from './app.routes'; // Import routes
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TaskBoardComponent,
    HeaderComponent
   
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), 
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
