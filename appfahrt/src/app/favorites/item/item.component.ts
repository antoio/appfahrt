import {Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatDialog} from '@angular/material';
import {RemoveFavoriteDialogComponent} from '../../dialogs/remove-favorite/remove-favorite-dialog.component';
import {DatabaseService, Favorite} from '../../services/database-service.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[];
  tagCtrl = new FormControl();
  _tags = new Array<string>();


  @Input() favorite: Favorite;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  constructor(
    public dialog: MatDialog,
    public databaseService: DatabaseService) {
    this.separatorKeysCodes = [ENTER, COMMA];
  }
  get tags() {
    if (this.favorite && this.favorite.favoritetags) {
      this._tags = this.favorite.favoritetags;
    }
    return this._tags;
  }
  set tags(tags: Array<string>) {
    this._tags = tags;
  }
  ngOnInit() {
    if (this.favorite === null || this.favorite === undefined) { return; }
    this.databaseService.getFavoriteSnapshot(this.favorite.stationId, this.favorite.userId).subscribe(favorite => {
      const data = favorite.docs[0].data();
      if (data.favoritetags) {
        this.tags = data.favoritetags;
      } else {
        this.tags = [];
      }
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tag and update db
    if ((value || '').trim()) {
      this.tags.push(value.trim());
      this.saveTags();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }
  saveTags() {
    this.databaseService.getFavoriteSnapshot(this.favorite.stationId, this.favorite.userId).subscribe(favorite => {
      this.databaseService.updateTags(favorite.docs[0].id, this.tags, this.favorite);
    });
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.saveTags();
  }


  public onDeleteFavoriteDialog() {
    const dremoveFavoriteDialog = this.dialog.open(RemoveFavoriteDialogComponent);
    dremoveFavoriteDialog.componentInstance.favorite = this.favorite;
  }

}
