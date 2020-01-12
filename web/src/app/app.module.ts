import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookBookComponent } from './CookBook/components/cookbook.component';
import { CookbookEffects } from './CookBook/cookbook.effects';
import { CookbookReducer } from './CookBook/cookbook.reducer';
import { TreeModule } from 'angular-tree-component';

@NgModule({
    declarations: [AppComponent, CookBookComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot({ cooks: CookbookReducer }),
        EffectsModule.forRoot([CookbookEffects]),
        TreeModule.forRoot(),
],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}