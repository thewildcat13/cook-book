import { Action, createReducer, on } from '@ngrx/store';
import * as CookBookActions from './cookbook.action';
import Cook from './cook.model';
import CookBookState, { initializeState } from './cookbook.state';

const initialState = initializeState();

const reducer = createReducer(
    initialState,
    on(CookBookActions.GetCookAction, state => state),
    on(CookBookActions.CreateCookAction, (state: CookBookState, cook: Cook) => {
        return { ...state, Cooks: [...state.Cooks, cook], CookError: null };
    }),

    on(CookBookActions.SuccessGetCookAction, (state: CookBookState, { payload }) => {
        return { ...state, Cooks: payload, CookError: null };
    }),
    on(CookBookActions.SuccessCreateCookAction, (state: CookBookState, { payload }) => {
        return { ...state, Cooks: payload, CookError: null };
    }),
    on(CookBookActions.SuccessUpdateCookAction, (state: CookBookState, { payload }) => {
        return { ...state, Cooks: payload, CookError: null };
    }),

    on(CookBookActions.ErrorCookAction, (state: CookBookState, error: Error) => {
        console.error(error);
        return { ...state, CookError: error };
    })
);

export function CookbookReducer(
    state: CookBookState | undefined,
    action: Action
): CookBookState {
    return reducer(state, action);
}