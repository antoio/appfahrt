import {Component, Input, OnInit} from '@angular/core';
import {Favorite} from '../../services/database-service.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() favorite: Favorite;


  constructor( ) { }

  ngOnInit() {
  }

}
