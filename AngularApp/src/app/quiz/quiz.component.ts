import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private router: Router, private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.seconds = 0;
    this.quizService.qnProgress = 0;
    this.quizService.qnTotal = 0;
    this.quizService.correctAnswerCount = 0;

    this.quizService.getQue(localStorage.getItem('category'), localStorage.getItem('level')).subscribe(
          (data: any) => {
            console.log(JSON.stringify(data));
            localStorage.setItem('receivedData', JSON.stringify(data));
            this.quizService.qns = data;
            this.quizService.qnTotal = this.quizService.qns.length;
            this.startTimer();
          }
        );
  }

  startTimer() {
    this.quizService.qnTotal = this.quizService.qns.length ;
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }

  answerCount() {
    if ( this.quizService.qns[this.quizService.qnProgress - 1].answers.length < 1) {
      return true;
    }
    return false;
  }

  Answer(choice: string) {
    this.quizService.qnProgress++;
    if ( choice === this.quizService.qns[this.quizService.qnProgress - 1].answers[0] ) {
      this.quizService.correctAnswerCount++;
      console.log(`correct answer`);
    }
    // console.log(`wrong answer`);
    // this.router.navigate(['/result']);
    if (this.quizService.qnProgress === this.quizService.qns.length) {
      console.log(`total correct` + this.quizService.correctAnswerCount);
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }
  AnswerMulti(option: string[]) {
    console.log(`multiple answer` + option);
  }

}
