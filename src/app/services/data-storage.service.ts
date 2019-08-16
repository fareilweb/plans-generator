import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppDataModel, AppDataModelAdapter } from '../models/AppDataModel';
import { TaskModel } from '../models/TaskModel';
import { PersonModel } from '../models/PersonModel';
import { EventModel } from '../models/EventModel';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private Key: string = null;
  private AppData: AppDataModel = null;

  constructor(private appDataModelAdapter: AppDataModelAdapter) {
    this.Initialize();
  }

  private Initialize(): void {

    if (this.Key == null) {
      this.Key = environment.localStorageKey;
    }

    if (this.AppData == null) {
      this.LoadAppDataFromLocalStorage();
    }

  }


  private LoadAppDataFromLocalStorage() {
    const appData: any = localStorage.getItem(this.Key);
    if (!!appData) {
      this.AppData = this.appDataModelAdapter.adapt(JSON.parse(appData));
    } else {
      const newAppData = new AppDataModel();
      localStorage.setItem(this.Key, JSON.stringify(newAppData));
      this.AppData = new AppDataModel();
    }
  }


  private UpdateAppDataToLocalStorage(): boolean {
    if (this.AppData == null) { return false; }
    localStorage.setItem(this.Key, JSON.stringify(this.AppData));
    return true;
  }


  public GetNewIdFor(collection: Array<any>): number {
    let newId = 1;

    if (collection.length > 0) {
      const idList: Array<number> = collection.map( (item) => item.Id);
      const maxId = Math.max(...idList);
      newId = maxId + 1;
    }

    return newId;
  }


//#region Tasks CRUD

  public GetTasks(): Array<TaskModel> {
    return this.AppData.Tasks;
  }


  public GetTaskById(id: number): TaskModel {
    return this.AppData.Tasks.find((x) => x.Id === id);
  }


  public AddOrUpdateTask(model: TaskModel) {

    if (model.Id == null) {
      model.Id = this.GetNewIdFor(this.AppData.Tasks);
      this.AppData.Tasks.push(model);
    } else {
      const index = this.AppData.Tasks.findIndex((x) => x.Id === model.Id);
      this.AppData.Tasks[index] = model;
    }

    this.UpdateAppDataToLocalStorage();
  }

  public DeleteTask(id: number) {
    const index = this.AppData.Tasks.findIndex((x) => x.Id === id);
    this.AppData.Tasks.splice(index, 1);

    this.UpdateAppDataToLocalStorage();
  }

//#endregion Tasks CRUD



//#region Persons CRUD

public GetPersons(): Array<PersonModel> {
  return this.AppData.Persons;
}

public GetPersonById(id: number): PersonModel {
  return this.AppData.Persons.find((x) => x.Id === id);
}

public AddOrUpdatePerson(model: PersonModel) {

  if (model.Id == null) {
    model.Id = this.GetNewIdFor(this.AppData.Persons);
    this.AppData.Persons.push(model);
  } else {
    const index = this.AppData.Persons.findIndex((x) => x.Id === model.Id);
    this.AppData.Persons[index] = model;
  }

  this.UpdateAppDataToLocalStorage();
}

public DeletePerson(id: number) {
  const index = this.AppData.Persons.findIndex((x) => x.Id === id);
  this.AppData.Persons.splice(index, 1);

  this.UpdateAppDataToLocalStorage();
}

//#endregion Persons CRUD



//#region Events CRUD

public GetEvents(): Array<EventModel> {
  return this.AppData.Events;
}

public GetEventById(id: number): EventModel {
  return this.AppData.Events.find((x) => x.Id === id);
}

public AddOrUpdateEvent(model: EventModel) {

  if (model.Id == null) {
    model.Id = this.GetNewIdFor(this.AppData.Events);
    this.AppData.Events.push(model);
  } else {
    const index = this.AppData.Events.findIndex((x) => x.Id === model.Id);
    this.AppData.Events[index] = model;
  }

  this.UpdateAppDataToLocalStorage();
}

public DeleteEvent(id: number) {
  const index = this.AppData.Events.findIndex((x) => x.Id === id);
  this.AppData.Events.splice(index, 1);

  this.UpdateAppDataToLocalStorage();
}

//#endregion Events CRUD


}
