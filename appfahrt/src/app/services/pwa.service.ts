import {Injectable} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {config} from '../config';


@Injectable()
export class PwaService {
  public promptEvent: any;
  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.subscribe(event => {
      if (confirm(`Es gibt eine neue Version (${config.appVersion}). Update jetzt durchführen?`)) {
        window.location.reload();
      }
    });

    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
      console.log('loaded', this.promptEvent);
    });
    window.addEventListener('appinstalled', (evt) => {
      console.log('app is installed');
    });
  }
}
