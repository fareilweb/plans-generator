import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import * as moment from 'moment'; // Import moment.js
import { DATE_FORMATS } from 'src/app/constants/DateFormats';
import { TaskModel } from 'src/app/models/TaskModel';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PersonModel } from 'src/app/models/PersonModel';
import { locale } from 'moment';
import { LOCALIZED_STRINGS } from 'src/app/constants/LocalizedStrings';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  Persons: Array<PersonModel>;
  Tasks: Array<TaskModel>;
  LocaleId: string;

  constructor(
    @Inject(LOCALE_ID) localeId: string,
    private dataStorageService: DataStorageService,
    private notificationService: NotificationService
  ) {
    this.LocaleId = localeId;

  }

  ngOnInit() {
    this.LoadDataFromStorage();
  }

  private LoadDataFromStorage() {
    this.Persons = this.dataStorageService.GetPersons();
    this.Tasks = this.dataStorageService.GetTasks();
  }

}
