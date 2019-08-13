import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { INotification } from '../interfaces/INotification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationTimeoutTimer;
  private notificationTimeoutTime;
  private notificationSubject: Subject<INotification> = new Subject<INotification>();

  notification = this.notificationSubject.asObservable();

  constructor() {
    this.notificationTimeoutTime = 5000;
  }

  show(notificationText: string = '', notificationType: string = null, notificationLogObject: Object = null) {
    this.notificationSubject.next(<INotification> {
      visible: true,
      text: notificationText,
      type: notificationType,
      logObject: notificationLogObject
    });

    const _this = this;
    this.notificationTimeoutTimer = setTimeout(function() {
      _this.hide();
    }, this.notificationTimeoutTime);
  }

  hide() {
    this.notificationSubject.next(<INotification>{visible: false, text: null, type: null, logObject: null});
    if (!!this.notificationTimeoutTimer) {
      clearTimeout(this.notificationTimeoutTimer);
      this.notificationTimeoutTimer = null;
    }
  }
}
