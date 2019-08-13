import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { PersonModel } from 'src/app/models/PersonModel';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as moment from 'moment'; // Import moment.js
import { DATE_FORMATS } from 'src/app/constants/DateFormats';
import { LOCALIZED_STRINGS } from 'src/app/constants/LocalizedStrings';
import { TaskModel } from 'src/app/models/TaskModel';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  Persons: Array<PersonModel>;
  SelectedPerson: PersonModel;
  IsPersonSelected: boolean;
  AvailableTasks: Array<TaskModel>;
  TaskToAddId: number;
  ScheduledAbsenceToAdd: moment.Moment;
  LocaleId: string;

  constructor(
    @Inject(LOCALE_ID) localeId: string,
    private dataStorageService: DataStorageService,
    private notificationService: NotificationService
  ) {
    this.LocaleId = localeId;
    this.SelectedPerson = new PersonModel();
    this.IsPersonSelected = false;
  }

  ngOnInit() {
    this.LoadDataFromStorage();
  }

  private LoadDataFromStorage() {
    this.Persons = this.dataStorageService.GetPersons();
    this.AvailableTasks = this.dataStorageService.GetTasks();
    console.log(this.AvailableTasks);
  }

  SelectPerson(person: PersonModel) {
    this.SelectedPerson = person;
    this.IsPersonSelected = true;
  }

  DeletePerson(person: PersonModel) {
    this.dataStorageService.DeletePerson(person.Id);
  }

  CreateNewPerson() {
    this.SelectedPerson = new PersonModel();
  }

  AddOrUpdatePerson() {
    if (this.SelectedPerson.Name) {
      this.dataStorageService.AddOrUpdatePerson(this.SelectedPerson);
      this.notificationService.show(LOCALIZED_STRINGS[this.LocaleId].AddOrUpdateSuccessMessage, 'success');
    } else {
      this.notificationService.show(LOCALIZED_STRINGS[this.LocaleId].AddOrUpdateNoNameErrorMessage, 'error');
    }
  }

  AddScheduledAbsence() {
    if (!!this.ScheduledAbsenceToAdd) {
      const dateFormat = DATE_FORMATS[this.LocaleId].display.dateA11yLabel;
      const date = this.ScheduledAbsenceToAdd.format(dateFormat).toString();
      this.SelectedPerson.ScheduledAbsences.push(date);
    }
  }

  RemoveScheduledAbsence(date: string) {
    const index = this.SelectedPerson.ScheduledAbsences.indexOf(date);
    this.SelectedPerson.ScheduledAbsences.splice(index, 1);
  }

  AssignTask() {
    const task = this.AvailableTasks.find(x => x.Id === this.TaskToAddId);
    if (this.IsPersonSelected === false || task === null) { return; }
    this.SelectedPerson.AssignedTasks.push(task);
    this.TaskToAddId = null;
  }

  RemoveTask(task: TaskModel) {
    if (this.IsPersonSelected === false) { return; }
    const index = this.AvailableTasks.findIndex(x => x.Id === task.Id);
    if (index !== -1) {
      this.SelectedPerson.AssignedTasks.splice(index, 1);
    }
  }
}
