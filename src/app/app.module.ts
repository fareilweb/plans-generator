import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';
/* Material Imports */
import { MaterialModule } from 'src/material-module';
// Dates, Datepickers, Moment.js, ecc.
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateModule, MomentDateAdapter, MatMomentDateModule } from '@angular/material-moment-adapter';
import { DATE_FORMATS } from './constants/DateFormats';

//#region Localization Stuff

const currentLocaleConfig = 'en'; // <-- Will be used as current language

// Needed for every non English languages)
import { registerLocaleData } from '@angular/common';
// Locale italian
import localeItalian from '@angular/common/locales/it';
registerLocaleData(localeItalian, 'it');

//#endregion Localization Stuff


/* App Stuff */
import { MainComponent } from './components/main/main.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { PersonsComponent } from './components/persons/persons.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { NotificationComponent } from './components/notification/notification.component';
import { EventsComponent } from './components/events/events.component';


/* App Routes */
const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'persons',
    component: PersonsComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'generator',
    component: GeneratorComponent
  }
];


/* App Module */
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TasksComponent,
    PersonsComponent,
    GeneratorComponent,
    NotificationComponent,
    EventsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MomentDateModule,
    MatMomentDateModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: currentLocaleConfig},
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS[currentLocaleConfig] }, // Change the format based of localization of the app
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [LOCALE_ID] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
