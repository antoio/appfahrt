import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Address } from 'angular-google-place';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html'
})
export class AutocompleteComponent implements OnInit {
  ready = false;

  public searchControl: FormControl;
  @Output() location: EventEmitter<any> = new EventEmitter<any>();
  public options = {type : 'address', componentRestrictions: { country: 'CH' }};

  getFormattedAddress(event: any) {
    this.location.emit({x: event.lng, y: event.lat});
  }

  ngOnInit() {
    setTimeout(() => {
      this.ready = true;
    }, 1000);
  }


}
