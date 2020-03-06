import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { CardComponent } from '../components/card/card.component';
import { CardsListComponent } from '../components/cards-list/cards-list.component';

import { CardsService } from '../service/cards.service';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardsListComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  providers: [ CardsService ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
