import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/TaskModel';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  Tasks: Array<TaskModel>;
  SelectedTask: TaskModel;

  constructor(private dataStorageService: DataStorageService) {
    this.SelectedTask = new TaskModel();
  }

  private LoadDataFromStorage() {
    this.Tasks = this.dataStorageService.GetTasks();
  }

  SelectTask(task: TaskModel) {
    this.SelectedTask = task;
  }

  DeleteTask(task: TaskModel) {
    this.dataStorageService.DeleteTask(task.Id);
  }

  AddOrUpdateTask() {
    if (this.SelectedTask.Name) {
      this.dataStorageService.AddOrUpdateTask(this.SelectedTask);
    } else {
      alert('Impossibile aggiungere un elemento senza nome.');
    }
  }

  CreateNewTask() {
    this.SelectedTask = new TaskModel();
  }

  ngOnInit() {
    this.LoadDataFromStorage();
  }
}
