import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopupformComponent } from './popupform/popupform.component';
import { FormsModule } from '@angular/forms';
import { ImageAnnotationComponent } from './image-annotation/image-annotation.component';

@NgModule({
  declarations: [
    AppComponent,
    PopupformComponent,
    ImageAnnotationComponent
    ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
