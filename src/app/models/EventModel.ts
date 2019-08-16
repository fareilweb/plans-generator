import { IAdapter } from '../interfaces/IAdapter';
import { Injectable } from '@angular/core';


/**
 * The Model
 */
export class EventModel {
  Id: number;
  Name: string;
  IsPeriodic: boolean;
  Rate: string;
  constructor(id: number = null, name: string = null, isPeriodic: boolean = true, rate: string = 'weekly') {
    this.Id = id;
    this.Name = name;
    this.IsPeriodic = isPeriodic;
    this.Rate = rate;
  }
}


/**
 * Adapter for the Model
 **/
@Injectable({providedIn: 'root'})
export class EventModelAdapter implements IAdapter<EventModel> {
  adapt(sourceObj: any): EventModel {
    return new EventModel(
      sourceObj.Id,
      sourceObj.Name,
      sourceObj.IsPeriodic,
      sourceObj.Rate
    );
  }
}

