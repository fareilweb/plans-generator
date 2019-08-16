import { IAdapter } from '../interfaces/IAdapter';
import { Injectable } from '@angular/core';

/**
 * The Model
 */
//@Injectable({providedIn: 'root'})
export class ProgramModel {
	Id:number;
  Name:string;
  constructor(id = null, name = null) {
    this.Id = id;
    this.Name = name;
  }
}


/**
 * Adapter for the Model
 **/
@Injectable({providedIn: 'root'})
export class ProgramModelAdapter implements IAdapter<ProgramModel> {
  adapt(sourceObj: any): ProgramModel {
    return new ProgramModel(
      sourceObj.Id,
      sourceObj.Name
    );
  }
}