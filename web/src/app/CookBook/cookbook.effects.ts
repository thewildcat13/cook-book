import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CookBookActions from './cookbook.action';
import { CookbookHttpservice } from './cookbook.httpservice';
import Cook from './cook.model';

@Injectable()
export class CookbookEffects {
    constructor(private cookbookService: CookbookHttpservice, private action$: Actions) {}

    getCooks: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(CookBookActions.BeginGetCookAction),
            mergeMap(action =>
                this.cookbookService.getCooks().pipe(
                    map((data: Cook[]) => {
                        return CookBookActions.SuccessGetCookAction({ payload: data });
                    }),
                    catchError((error: Error) => {
                        return of(CookBookActions.ErrorCookAction(error));
                    })
                )
            )
        )
    );

    createCooks: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(CookBookActions.BeginCreateCookAction),
            mergeMap(action =>
                this.cookbookService.createCooks(action.payload).pipe(
                    map((data: Cook[]) => {
                        return CookBookActions.SuccessCreateCookAction({ payload: data });
                    }),
                    catchError((error: Error) => {
                        return of(CookBookActions.ErrorCookAction(error));
                    })
                )
            )
        )
    );

    updateCooks: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(CookBookActions.BeginUpdateCookAction),
            mergeMap(action =>
                this.cookbookService.updateCooks(action.payload).pipe(
                    map((data: Cook[]) => {
                        return CookBookActions.SuccessUpdateCookAction({ payload: data });
                    }),
                    catchError((error: Error) => {
                        return of(CookBookActions.ErrorCookAction(error));
                    })
                )
            )
        )
    );
}