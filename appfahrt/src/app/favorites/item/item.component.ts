import {Component, Input, ViewChild, ElementRef} from '@angular/core';
import {MatDialog} from '@angular/material';
import {RemoveFavoriteDialogComponent} from '../../dialogs/remove-favorite/remove-favorite-dialog.component';
import {DatabaseService, Favorite} from '../../services/database-service.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[];
  allTags: string[] = [];

  @Input() favorite: Favorite;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;


  constructor(
    public dialog: MatDialog, 
    public databaseService: DatabaseService) { 
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
      this.separatorKeysCodes = [ENTER, COMMA];
  }

  ngOnInit()  {
    this.databaseService.getFavoriteSnapshot(this.favorite.stationId, this.favorite.userId).subscribe(favorite => {
      let data = favorite.docs[0].data();
      if(data.favoritetags) {
        this.tags = data.favoritetags;
      } else {
        this.tags = []
      }
    });
  }

  add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;

      // Add tag and update db
      if ((value || '').trim()) {
        this.tags.push(value.trim());
        this.databaseService.getFavoriteSnapshot(this.favorite.stationId, this.favorite.userId).subscribe(favorite => {
          this.databaseService.updateTags(favorite.docs[0].id, this.tags, this.favorite);
        });
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  public onDeleteFavoriteDialog() {
    const dremoveFavoriteDialog = this.dialog.open(RemoveFavoriteDialogComponent);
    dremoveFavoriteDialog.componentInstance.favorite = this.favorite;
  }

}
