import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './Utility/loader/loader.component';
import { SnackbarComponent } from './Utility/snackbar/snackbar.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { RouteModule } from './route.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CreateTaskComponent } from './dashbord/create-task/create-task.component';
import { TaskDetailsComponent } from './dashbord/task-details/task-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent,
    SnackbarComponent,
    DashbordComponent,
    HeaderComponent,
    FooterComponent,
    CreateTaskComponent,
    TaskDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
