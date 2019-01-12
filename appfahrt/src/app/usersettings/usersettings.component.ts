import {Component, OnInit} from '@angular/core';
import {MatSliderChange} from '@angular/material';
import {ISettings, SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.css']
})
export class UsersettingsComponent implements OnInit {
  settings: ISettings;
  test = 100;

  constructor(private settingsService: SettingsService) {
    this.settings = {
      maxDashboards: settingsService.maxDashboards,
      clockType: settingsService.clockType,
      stationCount: settingsService.stationCount,
      updateRate: settingsService.updateRate,
      showDuration: settingsService.showDuration
    };
  }

  public onClockChange() {
    this.settingsService.changeClockType();
  }

  public onShowDurationChange() {
    this.settingsService.switchDuration();
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

  ngOnInit() {
  }

}
