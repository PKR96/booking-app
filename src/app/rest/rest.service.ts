import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable'

@Injectable()
export class RestService {

    constructor(private httpClient: HttpClient) {
    }

    private static readonly URL: string = 'http://localhost:8080/'

    exchangeForm(data: any, url: string): Observable<any> {
        const apiUrl: string = RestService.URL.concat(url);
        return this.httpClient.post<any>(apiUrl, data);
    }

    login(data: any, url: string): Observable<any> {
        const apiUrl: string = RestService.URL.concat(url);
        return this.httpClient.get<any>(apiUrl, data);

    }

}