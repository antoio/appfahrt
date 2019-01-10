import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';
import {PwaService} from '../../services/pwa.service';

@Component({
  selector: 'app-install-app',
  templateUrl: './install-app-dialog.component.html',
  styleUrls: ['./install-app-dialog.component.css'],
  providers: [PwaService]
})
export class InstallAppDialogComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<InstallAppDialogComponent>, public pwaService: PwaService) { }

  ngOnInit() {
  }
  close() {
    this.bottomSheetRef.dismiss();
  }
  installPwa() {
    this.pwaService.promptEvent.prompt();
  }
}
