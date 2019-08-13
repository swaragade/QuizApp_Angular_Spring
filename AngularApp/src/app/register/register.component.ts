import { Component, OnInit } from '@angular/core';
import { QuizService, Question } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  categoryList: string[] ;
  levelList: string[];
  category: string ;
  level: string;
  // qnsdata: string;

  constructor(private quizService: QuizService, private route: Router) { }

  ngOnInit() {
    this.quizService.getCategory().subscribe(
      response => this.categoryList = response
    );
    this.quizService.getLevel().subscribe(
      response => this.levelList = response
    );
  }

  OnSubmit(name: string) {
    localStorage.clear();
    localStorage.setItem('participant', name);
    localStorage.setItem('category', this.category);
    localStorage.setItem('level', this.level);
    this.route.navigate(['/quiz']);

    // this.quizService.getQue(this.category, this.level).subscribe(
    //   (data: any) => {
    //     console.log(JSON.stringify(data));
    //     localStorage.setItem('receivedData', JSON.stringify(data));
    //     // this.qnsdata = JSON.stringify(data);
    //     this.route.navigate(['/quiz']);
    //   }
    // );
  }
  setCategory(cat: string) {
    this.category = cat;
  }
  setLevel(lvl: string) {
    this.level = lvl;
  }

}
