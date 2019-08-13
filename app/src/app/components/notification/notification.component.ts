import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { INotification } from 'src/app/interfaces/INotification';

enum NotificationTypesClasses {
  success = 'alert alert-success',
  info = 'alert alert-info',
  warning = 'alert alert-warning',
  error = 'alert alert-danger'
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  visible = false;
  text: string;
  notificationClass: string;

  private subscription: Subscription;

  constructor( private notificationService: NotificationService ) { }

  ngOnInit() {
    this.subscription = this.notificationService.notification
      .subscribe((notification: INotification) => {
        this.visible = notification.visible;
        this.text = notification.text;
        this.notificationClass = NotificationTypesClasses[notification.type] || '';
        if (!!notification.logObject) { this.log(notification.logObject); }
      });
  }

  hide(): void {
    this.notificationService.hide();
  }

  log(logObject: Object): void {
    console.log(logObject);
  }


}
