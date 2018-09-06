import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit {
  @Output() newIndex = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: any) {
    console.log(form);
    this.newIndex.emit(form.index);
  }
}
