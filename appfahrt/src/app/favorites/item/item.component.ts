import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {RemoveFavoriteDialogComponent} from '../../dialogs/remove-favorite/remove-favorite-dialog.component';
import {Favorite} from '../../services/database-service.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() favorite: Favorite;


  constructor(public dialog: MatDialog) { }

  public onDeleteFavoriteDialog() {
    const dremoveFavoriteDialog = this.dialog.open(RemoveFavoriteDialogComponent);
    dremoveFavoriteDialog.componentInstance.favorite = this.favorite;
  }

}
