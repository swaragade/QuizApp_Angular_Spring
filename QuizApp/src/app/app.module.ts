import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './route';
import { NavbarComponent } from './navbar/navbar.component';
import { QuizService } from './shared/quiz.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    QuizComponent,
    ResultComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
