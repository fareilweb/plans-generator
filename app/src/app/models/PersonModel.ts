import { IAdapter } from '../interfaces/IAdapter';
import { Injectable } from '@angular/core';
import { TaskModel } from './TaskModel';

/**
 * The Model
 */
// @Injectable({providedIn: 'root'})
export class PersonModel {
  Id: number;
  Name: string;
  ScheduledAbsences: Array<string>;
  AssignedTasks: Array<TaskModel>;

  constructor(
    id = null,
    name = null,
    scheduledAbsences = new Array<string>(),
    assignedTasks: Array<TaskModel> = new Array<TaskModel>()
  ) {
    this.Id = id;
    this.Name = name;
    this.ScheduledAbsences = scheduledAbsences;
    this.AssignedTasks = assignedTasks;
  }
}

/**
 * Adapter for the Model
 **/
@Injectable({ providedIn: 'root' })
export class PersonModelAdapter implements IAdapter<PersonModel> {
  adapt(sourceObj: any): PersonModel {
    return new PersonModel(
      sourceObj.Id,
      sourceObj.Name,
      sourceObj.ScheduledAbsences,
      sourceObj.AssignedTasks
    );
  }
}
