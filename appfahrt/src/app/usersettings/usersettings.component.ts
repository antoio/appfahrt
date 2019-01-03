import { Component, OnInit } from '@angular/core';
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
      stationCount: settingsService.stationCount
    };
    console.log(this.settings);
  }
  public onClockChange() {
    this.settingsService.changeClockType();
  }
  public onStationCountChange(event: any) {
    const newValue = event.target.value;
    if (newValue === NaN) {
      console.error('not a value');
      return;
    }
    this.settingsService.stationCount = event.target.value;
  }
  public onMaxDashboardsChange(event: any) {
    const newValue = event.target.value;
    if (newValue === NaN) {
      console.error('not a value');
      return;
    }
    this.settingsService.maxDashboards = event.target.value;
  }

  ngOnInit() {
  }

}
