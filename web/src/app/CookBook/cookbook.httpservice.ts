import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Cook from './cook.model';

@Injectable({
    providedIn: 'root'
})
export class CookbookHttpservice {
    private ApiURL: string = 'http://localhost:3000';
    constructor(private httpclient: HttpClient) {}

    getCooks(): Observable<Cook[]> {
        return this.httpclient.get<Cook[]>(this.ApiURL);
    }

    createCooks(payload: Cook): Observable<Cook[]> {
        return this.httpclient.post<Cook[]>(this.ApiURL, JSON.stringify(payload), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    updateCooks(payload: Cook): Observable<Cook[]> {
        return this.httpclient.put<Cook[]>(`${this.ApiURL}/${payload.id}`, JSON.stringify(payload), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}