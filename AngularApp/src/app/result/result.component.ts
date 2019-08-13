import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private quizService: QuizService, private router: Router) { }

   ngOnInit() {
    //  console.log(`result progress` + this.quizService.qnProgress);
    //  console.log(`result length` + this.quizService.qnTotal);
    //  if (this.quizService.qnProgress !== this.quizService.qnTotal) {
    //   this.router.navigate(['/quiz']);
    // }
   }

  restart() {
    localStorage.setItem('qnProgress', '0');
    localStorage.setItem('qns', '');
    localStorage.setItem('seconds', '0');
    this.router.navigate(['/quiz']);
  }

}
