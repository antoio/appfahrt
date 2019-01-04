import {Component, Input, OnInit} from '@angular/core';
import {Board} from '../../board/board.component';
import {DatabaseService, Favorite} from '../../services/database-service.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() favorite: Favorite;


  constructor( private databaseService: DatabaseService) { }

  ngOnInit() {
  }

  onChangeDisplayStatus(index: number) {
    this.databaseService.getFavoriteSnapshot(this.favorite.stationId, this.favorite.userId).subscribe(favorite => {
      this.databaseService.changeFavoriteDisplayStatus(favorite.docs[0].id, index, this.favorite);
    });
  }

}
