import { Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CookBookActions from '../cookbook.action';
import Cook from '../cook.model';
import CookBookState from '../cookbook.state';

@Component({
    selector: 'cookbook',
    templateUrl: './cookbook.component.html'
})
export class CookBookComponent implements OnInit {
    constructor(private store: Store<{ cooks: CookBookState }>) {
        this.cook$ = store.pipe(select('cooks'));
    }

    ngOnInit() {
        this.CookSubscription = this.cook$
            .pipe(
                map(x => {
                    this.CookList = x.Cooks;
                    this.cookError = x.CookError;
                })
            )
            .subscribe();

        this.store.dispatch(CookBookActions.BeginGetCookAction());
    }

    cook$: Observable<CookBookState>;
    CookSubscription: Subscription;
    CookList: Cook[] = [];

    options = {
        displayField: 'title',
        childrenField: 'nodeChilds',
    };

    selectedCook = {};

    newTitle: string = '';
    newDescription: string = '';

    id: number;
    title: string = '';
    description: string = '';
    parentId: number;

    cookError: Error = null;

    createNewCook() {
        const cook: Cook = {
            title: this.newTitle,
            description: this.newDescription,
        };
        this.store.dispatch(CookBookActions.BeginCreateCookAction({ payload: cook }));
        this.newTitle = '';
        this.newDescription = '';
    }

    createCook() {
        const cook: Cook = {
            title: this.title,
            description: this.description,
            parentId: this.parentId,
        };
        this.store.dispatch(CookBookActions.BeginCreateCookAction({ payload: cook }));
        this.selectedCook = {};
    }

    updateCook() {
        const cook: Cook = {
            id: this.id,
            title: this.title,
            description: this.description,
            parentId: this.parentId,
        };
        this.store.dispatch(CookBookActions.BeginUpdateCookAction({ payload: cook }));
        this.selectedCook = {};
    }

    forkCook(parentNode) {
        this.selectedCook = {id: parentNode.id, action: 'FORK'};
        this.title = parentNode.title;
        this.description = parentNode.description;
        this.parentId = parentNode.id;
    }

    editCook(parentNode) {
        this.selectedCook = {id: parentNode.id, action: 'EDIT'};
        this.id = parentNode.id;
        this.title = parentNode.title;
        this.description = parentNode.description;
    }

    ngOnDestroy() {
        if (this.CookSubscription) {
            this.CookSubscription.unsubscribe();
        }
    }
}