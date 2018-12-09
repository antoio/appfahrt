import {Injectable, EventEmitter, Output} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable()
export class NavigationService {
  currentTitle = 'Appfahrt';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {
  }

  init() { }
}
