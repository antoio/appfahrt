import {Injectable} from '@angular/core';

export interface ISettings {
  maxDashboards: number;
  clockType: string;
  stationCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  private localstoreKey = 'appfahrt-settings';

  constructor() {
    if (this.loadStorageSettings() === null) {
      // Defaults
      this.saveStorageSettings({
        maxDashboards: 1,
        clockType: 'analog',
        stationCount: 10
      });
    }
  }

  public get maxDashboards(): number {
    return this.loadStorageSettings().maxDashboards;
  }
  public set maxDashboards(value: number) {
    const s = this.loadStorageSettings();
    s.maxDashboards = value;
    this.saveStorageSettings(s);
  }
  public get clockType(): string {
    return this.loadStorageSettings().clockType;
  }
  public changeClockType() {
    const s = this.loadStorageSettings();
    s.clockType === 'analog' ? s.clockType = 'digital' : s.clockType = 'analog';
    this.saveStorageSettings(s);
  }
  public get stationCount(): number {
    return this.loadStorageSettings().stationCount;
  }
  public set stationCount(value: number) {
    const s = this.loadStorageSettings();
    s.stationCount = value;
    this.saveStorageSettings(s);
  }

  private loadStorageSettings() {
    return JSON.parse(localStorage.getItem(this.localstoreKey)) as ISettings;
  }
  private saveStorageSettings(newSettings: ISettings) {
    localStorage.setItem(this.localstoreKey, JSON.stringify(newSettings));
  }

}
