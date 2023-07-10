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
        return this.httpClient.post<any>(apiUrl, data,{headers:this.getHttpHeaders(),observe: 'response'});
    }

    retrieveAvailableBookingSlots(): Observable<any>{
        const apiUrl: string = RestService.URL.concat('/bookings/0');
        return this.httpClient.get<any>(apiUrl, {headers:this.getHttpHeaders()});
    }

    bookAppointment(url:string): Observable<any>{
        const apiUrl: string = RestService.URL.concat(url);
        console.log(apiUrl)
        return this.httpClient.post<any>(apiUrl,null,{headers:this.getHttpHeaders(),observe: 'response'});
    }


    private getHttpHeaders():HttpHeaders{
        const token = sessionStorage.getItem('Authorization');
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization' : token ? token : ''
        })
        console.log(headers);
        return headers;

    }
}