import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable'

@Injectable({
    providedIn: 'root'
  })
  
export class RestService {

    constructor(private httpClient: HttpClient) {
    }

    private static readonly URL: string = 'http://localhost:8080'

    exchangeForm(data: any, url: string): Observable<any> {
        const apiUrl: string = RestService.URL.concat(url);
        console.log(apiUrl)
        return this.httpClient.post<any>(apiUrl, data,{headers:this.getHttpHeaders(data.token),observe: 'response'});
    }

    login(data: any, url: string): Observable<any> {
        const apiUrl: string = RestService.URL.concat(url);
        return this.httpClient.post<any>(apiUrl, data,{headers:this.getHttpHeaders()});

    }


    private getHttpHeaders(token?:string):HttpHeaders{
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization' : token? token : ''
        })
        return headers;

    }
}