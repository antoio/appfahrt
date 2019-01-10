import {Component, OnInit} from '@angular/core';
import {InstallAppDialogComponent} from './dialogs/install-app/install-app-dialog.component';
import {NavigationService} from './navigation/navigation.service';
import {PwaService} from './services/pwa.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NavigationService, PwaService]
})
export class AppComponent implements OnInit {

  constructor(private navigationService: NavigationService, public pwaService: PwaService, private bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
    this.navigationService.init();
    // this.bottomSheet.open(InstallAppDialogComponent);
  }

  installPwa(): void {
    this.pwaService.promptEvent.prompt();
  }
}
