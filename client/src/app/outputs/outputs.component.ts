import {Component, Input, OnInit} from '@angular/core';
import {FibIndex} from '../fibIndex';
import {FibValue} from '../fibValue';

@Component({
  selector: 'app-outputs',
  templateUrl: './outputs.component.html',
  styleUrls: ['./outputs.component.scss']
})
export class OutputsComponent implements OnInit {
  @Input() indexes: FibIndex[];
  @Input() values: FibValue[];

  constructor() { }

  ngOnInit() {
  }

  showList(indexes: FibIndex[]): string {
    return indexes.map(({ number }) => number).join(', ');
  }
}
