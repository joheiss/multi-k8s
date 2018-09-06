import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs/index';
import {map, tap} from 'rxjs/internal/operators';
import {FibValue} from './fibValue';
import {FibIndex} from './fibIndex';

@Injectable()
export class ValuesService {

  constructor(private http: HttpClient) {
  }

  fetchValues(): Observable<FibValue[]> {
    // return of([{index: "1", result: "1"}, {index: "2", result: "1"}]);
    console.log('service to fetch values ...');
    return this.http.get<FibValue[]>("/api/values/current")
      .pipe(
        map(data => data),
        tap(console.log),
        tap(() => console.log('fetchValues'))
      );
  }

  fetchIndexes(): Observable<FibIndex[]> {
    // return of([{number: "1"}, {number: "2"}]);
    console.log('service to fetch indexes ...');
    return this.http.get<FibIndex[]>("/api/values/all")
      .pipe(
        map(data => data),
        tap(console.log),
        tap(() => console.log('fetchIndexes'))
      );
  }

  postIndex(index: string): Observable<any> {
    // return of([{number: "1"}, {number: "2"}]);
    return this.http.post<FibIndex[]>("/api/values", { index })
      .pipe(
        map(data => data),
        tap(console.log),
        tap(() => console.log('postIndex'))
      );
  }
}
