import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { EventModel } from 'src/app/models/EventModel';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as moment from 'moment'; // Import moment.js
import { DATE_FORMATS } from 'src/app/constants/DateFormats';
import { LOCALIZED_STRINGS } from 'src/app/constants/LocalizedStrings';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  Events: Array<EventModel>;
  SelectedEvent: EventModel;
  IsEventSelected: boolean;
  LocaleId: string;

  constructor(
    @Inject(LOCALE_ID) localeId: string,
    private dataStorageService: DataStorageService,
    private notificationService: NotificationService
  ) {
    this.LocaleId = localeId;
    this.SelectedEvent = new EventModel();
  }

  ngOnInit() {
    this.LoadDataFromStorage();
  }

  private LoadDataFromStorage() {
    this.Events = this.dataStorageService.GetEvents();
    console.log(this.Events);
  }

  SelectEvent(event: EventModel) {
    this.SelectedEvent = event;
    this.IsEventSelected = true;
  }

  DeleteEvent(event: EventModel) {
    this.dataStorageService.DeleteEvent(event.Id);
  }

  CreateNewEvent() {
    this.SelectedEvent = new EventModel();
  }

  AddOrUpdateEvent() {
    if (this.SelectedEvent.Name) {
      this.dataStorageService.AddOrUpdateEvent(this.SelectedEvent);
      this.notificationService.show(LOCALIZED_STRINGS[this.LocaleId].AddOrUpdateSuccessMessage, 'success');
    } else {
      this.notificationService.show(LOCALIZED_STRINGS[this.LocaleId].AddOrUpdateNoNameErrorMessage, 'error');
    }
  }

}

