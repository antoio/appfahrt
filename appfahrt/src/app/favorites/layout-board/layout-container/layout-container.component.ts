import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.css']
})
export class LayoutContainerComponent implements OnInit {
  @Input() boardNr: number;
  constructor() { }

  ngOnInit() {
  }

}
