import {Component, OnInit, Output, EventEmitter, ViewChild, Input} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Address } from 'angular-google-place';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  ready = false;
  @Input() leftSpace = 100;

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
