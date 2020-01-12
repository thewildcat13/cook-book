import { createAction, props } from '@ngrx/store';
import Cook from './cook.model';

export const GetCookAction = createAction('[CookBook] - Get Cook');

export const CreateCookAction = createAction(
    '[CookBook] - Create Cook',
    props<Cook>()
);

export const BeginGetCookAction = createAction('[CookBook] - Begin Get Cook');

export const SuccessGetCookAction = createAction(
    '[CookBook] - Sucess Get Cook',
    props<{ payload: Cook[] }>()
);

export const BeginCreateCookAction = createAction(
    '[CookBook] - Begin Create Cook',
    props<{ payload: Cook }>()
);

export const SuccessCreateCookAction = createAction(
    '[CookBook] - Sucess Create Cook',
    props<{ payload: Cook[] }>()
);

export const BeginUpdateCookAction = createAction(
    '[CookBook] - Begin Update Cook',
    props<{ payload: Cook }>()
);

export const SuccessUpdateCookAction = createAction(
    '[CookBook] - Sucess Update Cook',
    props<{ payload: Cook[] }>()
);

export const ErrorCookAction = createAction('[CookBook] - Error', props<Error>());