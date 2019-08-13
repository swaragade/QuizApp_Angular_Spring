import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Question {
  constructor(
    public qid: string,
    public question: string,
    public options: string[],
    public answers: string[],
    public category: string,
    public level: string
  ) { }
}
@Injectable()
export class QuizService {
  // ---------------- Properties---------------
  readonly rootUrl = 'http://localhost:8080';

  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  qnTotal: number;
  correctAnswerCount = 0;

  // ---------------- Helper Methods---------------

  constructor(private http: HttpClient) { }
  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  getParticipantName() {
    return localStorage.getItem('participant');
  }


  // ---------------- Http Methods---------------
  getCategory() {
    console.log('test call getCategory');
    return this.http.get<string[]>(this.rootUrl + '/getCategoryList');
  }
  getLevel() {
    console.log('test call getLevel');
    return this.http.get<string[]>(this.rootUrl + '/getLevelList');
  }
  getQue(catgr: string, lvl: string) {
    console.log('test call getQue');
    return this.http.get<Question[]>(this.rootUrl + `/getQueByType/` + catgr + `/` + lvl);
  }
}
