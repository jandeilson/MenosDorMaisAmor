import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Person } from 'src/app/models/person.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TestimonialsService {

  constructor(private httpService: HttpClient) {
  }

  /*
    public getUser(id: number): Observable<Person> {
    return this.httpService.get<Person>(`http://localhost:3000/user/${id}`).pipe(
      map(data => new Person().deserialize(data)),
      catchError(() => throwError('User not found'))
    );
  }
  */
  
  public getAllUsers(): Observable<Person[]> {
    return this.httpService.get<Person[]>(`http://localhost:3000/users`).pipe(
      map(data => data.map(data => new Person().deserialize(data))),
    );
  }
}