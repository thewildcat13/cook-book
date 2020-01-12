import Cook from './cook.model';

export default class CookBookState {
    Cooks: Array<Cook>;
    CookError: Error;
}

export const initializeState = (): CookBookState => {
    return { Cooks: Array<Cook>(), CookError: null };
};