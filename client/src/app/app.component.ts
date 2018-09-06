import {Component, OnInit} from '@angular/core';
import {ValuesService} from './values.service';
import {FibIndex} from './fibIndex';
import {FibValue} from './fibValue';
import {Observable, of, Subject} from 'rxjs/index';
import {emptyState, State} from './state';
import {switchMap, tap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  state: State = emptyState;

  indexes$: Observable<FibIndex[]>;
  values$: Observable<FibValue[]>;
  currentIndex$: Observable<String>;

  constructor(private service: ValuesService) {
  }

  ngOnInit(): void {
    this.values$ = this.service.fetchValues();
    this.indexes$ = this.service.fetchIndexes();
    this.currentIndex$ = of('');
  }

  onNewIndex(index: string) {
    console.log(index);
    this.state = {
      seenIndexes: this.state.seenIndexes,
      values: this.state.values,
      currentIndex: index
    };
    this.service.postIndex(index).pipe(
      tap(() => this.currentIndex$ = of('')),
      switchMap(() => this.indexes$ = this.service.fetchIndexes()),
      switchMap(() => this.values$ = this.service.fetchValues())
    )
      .subscribe();
  }

}
