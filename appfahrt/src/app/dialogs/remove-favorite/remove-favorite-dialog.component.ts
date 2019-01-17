import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {DatabaseService, Favorite} from '../../services/database-service.service';

@Component({
  selector: 'app-remove-favorite',
  templateUrl: './remove-favorite-dialog.component.html'
})
export class RemoveFavoriteDialogComponent {
  favorite: Favorite;
  constructor(public dialogRef: MatDialogRef<RemoveFavoriteDialogComponent>, private databaseService: DatabaseService) { }
  onCancel() {
    this.dialogRef.close();
  }
  onDelete() {
    this.databaseService.getFavoriteSnapshot(this.favorite.stationId, this.favorite.userId).subscribe(favorite => {
      this.databaseService.deleteFavorite(favorite.docs[0].id, this.favorite.userId);
      this.dialogRef.close();
    });
  }

}
