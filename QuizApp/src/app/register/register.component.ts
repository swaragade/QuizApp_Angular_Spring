import { Component, OnInit } from '@angular/core';
import { QuizService, Category, Level } from '../shared/quiz.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  categoryList: Category[];
  levelList: Level[];

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.getCategory().subscribe(
      response => this.categoryList = response
    );
    this.quizService.getLevel().subscribe(
      response => this.levelList = response
    );
  }

}
