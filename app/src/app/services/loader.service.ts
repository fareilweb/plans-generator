import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ILoaderState } from '../interfaces/ILoaderState';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject:Subject<ILoaderState> = new Subject<ILoaderState>();
  
  loaderState = this.loaderSubject.asObservable();
  
  constructor() { }
  
  show() {
    this.loaderSubject.next(<ILoaderState>{show: true});
  }

  hide() {
    this.loaderSubject.next(<ILoaderState>{show: false});
  }
  
}
