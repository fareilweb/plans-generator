import { IAdapter } from '../interfaces/IAdapter';
import { Injectable } from '@angular/core';
import { TaskModel, TaskModelAdapter } from './TaskModel';
import { PersonModel, PersonModelAdapter } from './PersonModel';
import { EventModel, EventModelAdapter } from './EventModel';

/**
 * The Model
 **/
export class AppDataModel {
  Tasks: Array<TaskModel>;
  Persons: Array<PersonModel>;
  Events: Array<EventModel>;
  constructor(
    tasks: Array<TaskModel> = new Array<TaskModel>(),
    persons: Array<PersonModel> = new Array<PersonModel>(),
    events: Array<EventModel> = new Array<EventModel>()
  ) {
    this.Tasks = tasks;
    this.Persons = persons;
    this.Events = events;
  }
}

/**
 * Adapter for the Model
 **/
@Injectable({ providedIn: 'root' })
export class AppDataModelAdapter implements IAdapter<AppDataModel> {
  constructor(
    private taskAdapter: TaskModelAdapter,
    private personAdapter: PersonModelAdapter,
    private eventAdapter: EventModelAdapter
  ) {}

  adapt(sourceObj: any): AppDataModel {
    let Tasks: Array<TaskModel>;
    let Persons: Array<PersonModel>;
    let Events: Array<EventModel>;

    // Iterate and adapt tasks
    Tasks = new Array<TaskModel>();
    if (!!sourceObj.Tasks && !!sourceObj.Tasks.length) {
      sourceObj.Tasks.forEach(task => {
        Tasks.push(this.taskAdapter.adapt(task));
      });
    }

    // Iterate and adapt persons
    Persons = new Array<PersonModel>();
    if (!!sourceObj.Persons && !!sourceObj.Persons.length) {
      sourceObj.Persons.forEach(person => {
        Persons.push(this.personAdapter.adapt(person));
      });
    }

    // Iterate and adapt persons
    Events = new Array<EventModel>();
    if (!!sourceObj.Events && !!sourceObj.Events.length) {
      sourceObj.Events.forEach(event => {
        Events.push(this.eventAdapter.adapt(event));
      });
    }

    return new AppDataModel(Tasks, Persons, Events);
  }
}
