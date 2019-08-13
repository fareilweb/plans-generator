import { IAdapter } from '../interfaces/IAdapter';
import { Injectable } from '@angular/core';

/**
 * The Model
 */
export class TaskModel {
  Id: number;
  Name: string;
  constructor(id: number = null, name: string = null) {
    this.Id = id;
    this.Name = name;
  }
}


/**
 * Adapter for the Model
 **/
@Injectable({providedIn: 'root'})
export class TaskModelAdapter implements IAdapter<TaskModel> {
  adapt(sourceObj: any): TaskModel {
    return new TaskModel(
      sourceObj.Id,
      sourceObj.Name
    );
  }
}
