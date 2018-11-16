import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Address } from 'angular-google-place';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html'
})
export class AutocompleteComponent implements OnInit {
  ready = false;
  get currentValue(): string { return this._currentValue; }

  constructor() {

  }

  _currentValue = 'Bern';
  public searchControl: FormControl;
  @Output() location: EventEmitter<any> = new EventEmitter<any>();
  public options = {type : 'address', componentRestrictions: { country: 'CH' }};
  setLocation(location: {x: number, y: number}) {
    this.location.emit(location);
  }
  getFormattedAddress(event: any) {
    console.log(event);
    this.setLocation({x: event.lng, y: event.lat});
  }

  ngOnInit() {
    setTimeout(() => {
      this.ready = true;
    }, 1000);
  }


}
