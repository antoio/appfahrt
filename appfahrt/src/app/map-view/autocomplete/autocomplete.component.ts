import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Address } from 'angular-google-place';

interface HistoryContainer {
  name: string,
  lat: number,
  lng: number,
  event: any
}
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  historyExists: boolean = true;
  history: HistoryContainer[] = [];
  input_entry: string = "";

  ready = false;
  @Input() leftSpace = 100;

  public searchControl: FormControl;
  @Output() location: EventEmitter<any> = new EventEmitter<any>();
  public options = { type: 'address', componentRestrictions: { country: 'CH' } };

  getFormattedAddress(event: any) {
    console.log("event:")
    console.log(event);
    this.putLocationInArray(event);
    this.location.emit({ x: event.lng, y: event.lat });
  }

  private async putLocationInArray(event: any) {
    let historyContainer = {
      name: this.createSearchString(event),
      lng: event.lng,
      lat: event.lat,
      event: event
    }

    // prevent duplicates
    for (let element of this.history) {
      if (element.name === historyContainer.name) {
        return;
      }
    }

    this.history[this.history.length % 3] = historyContainer;
  }

  ngOnInit() {
    setTimeout(() => {
      this.ready = true;
    }, 1000);
  }

  fillInputField(entry: HistoryContainer) {
    this.input_entry = entry.name;
    this.location.emit({ x: entry.lng, y: entry.lat });
  }

  private createSearchString(entry: any) {
    let searchString = "";
    if (entry.street) {
      searchString += this.stringOrEmpty(entry.street);
      searchString += " ";
      searchString += this.stringOrEmpty(entry.street_number);
      searchString += ", ";
    }
    if (entry.state) {
      searchString += this.stringOrEmpty(entry.state);
      searchString += ", ";
    }
    if (entry.city) {
      if (entry.postal_code) {
        searchString += this.stringOrEmpty(entry.postal_code);
        searchString += " ";
      }
      searchString += this.stringOrEmpty(entry.city);
    }
    console.debug(`constructed search string: ${searchString}`);

    return searchString;
  }

  private stringOrEmpty(input: string) {
    return input ? input : '';
  }

}
