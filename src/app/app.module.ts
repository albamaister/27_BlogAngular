import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appRoutingProviders, routing } from './app.routing';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';




import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';


// Servicios

import { UserService } from './services/user.service';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { CategoryService } from './services/category.service';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostService } from './services/post.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    UserEditComponent,
    CategoryNewComponent,
    PostNewComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule,
    FroalaViewModule,
    AngularFileUploaderModule

  ],
  providers: [
    appRoutingProviders,
    UserService,
    CategoryService,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
