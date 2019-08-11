import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Category {
  constructor(
    public name: string
  ) {}
}
export class Level {
  constructor(
    public name: string
  ) {}
}

export class QuizService {
// class properties
readonly rootUrl = 'http://localhost:8080';

// Helper methods
  constructor(private http: HttpClient) { }


// http clients
insertParticipant( name: string) {
  console.log(name);
}

getCategory() {
  console.log('test call getCategory');
  return this.http.get<Category[]>( this.rootUrl + '/getCategoryList' );
}
getLevel() {
  console.log('test call getLevel');
  return this.http.get<Level[]>( this.rootUrl + '/getLevelList' );
}
}
