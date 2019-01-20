import {Component, OnInit, Output, EventEmitter, ViewChild, Input} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Address } from 'angular-google-place';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  historyExists: boolean = true;
  history: any = new Set([]);
  input_entry: string = "";
  
  ready = false;
  @Input() leftSpace = 100;

  public searchControl: FormControl;
  @Output() location: EventEmitter<any> = new EventEmitter<any>();
  public options = {type : 'address', componentRestrictions: { country: 'CH' }};

  getFormattedAddress(event: any) {
    console.log("event:")
    console.log(event);
    this.putLocationInArray(event);
    this.location.emit({x: event.lng, y: event.lat});
  }

  private async putLocationInArray(event: any) {
    this.history.add(this.createSearchString(event));
    if(this.history.length > 2) {
      return;
    }
    console.table(this.history);
    for(let x in this.history) {
      console.log(x);
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.ready = true;
    }, 1000);
  }

  fillInput(entry: string) {
    this.input_entry = entry;
  }

  private createSearchString(entry: any) {
    let searchString = "";
    if(entry.street) {
      searchString += this.stringOrEmpty(entry.street);
      searchString += " ";
      searchString += this.stringOrEmpty(entry.street_number);
      searchString += ", ";
    }
    if(entry.state) {
      searchString += this.stringOrEmpty(entry.state);
      searchString += ", ";
    }
    if(entry.city) {
      if(entry.postal_code) {
        searchString += this.stringOrEmpty(entry.postal_code);
        searchString += " ";
      }
      searchString += this.stringOrEmpty(entry.city);
    }
    console.log(`constructed search string: ${searchString}`);
    
    return searchString;
  }

  private stringOrEmpty(input: string) {
    return input ? input : '';
  }

}
