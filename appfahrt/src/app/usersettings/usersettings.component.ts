import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSliderChange} from '@angular/material';
import {StationsService} from '../board/stations/stations.service';
import {DeleteUserDialogComponent} from '../dialogs/delete-user/delete-user-dialog.component';
import {ResetPasswordDialogComponent} from '../dialogs/reset-password/reset-password-dialog.component';
import {AuthServiceService} from '../services/auth-service.service';
import {ISettings, SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.css']
})
export class UsersettingsComponent implements OnInit {
  settings: ISettings;
  email = null;

  constructor(private settingsService: SettingsService, public dialog: MatDialog, private auth: AuthServiceService) {
    this.settings = {
      maxDashboards: settingsService.maxDashboards,
      clockType: settingsService.clockType,
      stationCount: settingsService.stationCount,
      updateRate: settingsService.updateRate,
      showDuration: settingsService.showDuration,
      fit: this.settingsService.fit
    };
  }

  public onClockChange() {
    this.settingsService.changeClockType();
  }

  public onShowDurationChange() {
    this.settingsService.switchDuration();
  }
  public onFitChange() {
    this.settingsService.changeFit();
  }

  public onStationCountChange(event: MatSliderChange) {
    const newValue = event.value;
    if (newValue === NaN) {
      console.error('not a value');
      return;
    }
    this.settings.stationCount = newValue;
    this.settingsService.stationCount = newValue;
  }

  public onMaxDashboardsChange(event: MatSliderChange) {
    const newValue = event.value;
    if (newValue === NaN) {
      console.error('not a value');
      return;
    }
    this.settings.maxDashboards = newValue;
    this.settingsService.maxDashboards = newValue;
  }

  public onUpdateIntervalChange(event: MatSliderChange) {
    const newValue = event.value;
    if (newValue === NaN) {
      console.error('not a value');
      return;
    }
    this.settings.updateRate = newValue;
    this.settingsService.updateRate = newValue;
  }

  public onOpenResetPasswordDialog() {
    const changePasswordDialog = this.dialog.open(ResetPasswordDialogComponent);
  }
  public onOpenDeleteUserDialog() {
    const deleteUserDialog = this.dialog.open(DeleteUserDialogComponent);
  }

  ngOnInit() {
    this.email = this.auth.getCurrentUser().subscribe(result => {
      this.email = result.email;
    });
  }
}
