import {Component, OnInit} from '@angular/core';
import {tap} from 'rxjs/operators';
import {DatabaseService, History} from '../services/database-service.service';

@Component({
  selector: 'app-search-histroy',
  templateUrl: './search-histroy.component.html',
  styleUrls: ['./search-histroy.component.css']
})
export class SearchHistroyComponent implements OnInit {
  history: Array<History>;

  constructor(public databaseService: DatabaseService) {
  }
  ngOnInit() {
    this.databaseService.getUserId().pipe(tap((user) => {
      if (user) {
        this.databaseService.getHistory(user.uid).subscribe((history) => {
          this.history = history;
        });
      }
    })).subscribe();
  }

}
