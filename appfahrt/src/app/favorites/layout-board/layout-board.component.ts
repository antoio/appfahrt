import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../services/settings.service';

interface BoardItem {
  nr: number;
  size: number;
}

@Component({
  selector: 'app-layout-board',
  templateUrl: './layout-board.component.html',
  styleUrls: ['./layout-board.component.css']
})
export class LayoutBoardComponent implements OnInit {
  layoutBoards: BoardItem[] = [];
  constructor(private settings: SettingsService) { }

  ngOnInit() {
    switch (this.settings.maxDashboards) {
      case 1: this.layoutBoards = [{nr: 1, size: 100}]; break;
      case 2: this.layoutBoards = [{nr: 1, size: 50}, {nr: 2, size: 50}]; break;
      case 3: this.layoutBoards = [{nr: 1, size: 50}, {nr: 2, size: 50}, {nr: 3, size: 100}]; break;
      default : this.layoutBoards = [{nr: 1, size: 50}, {nr: 2, size: 50}, {nr: 3, size: 50}, {nr: 4, size: 50}];
    }
  }

}
