import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  url="http://localhost:8080/trajectories/list"
  constructor(private httpClient: HttpClient) { }
  getTrajectories(request:any):Observable<any>{
    return this.httpClient.post(this.url, request,{responseType:'text'});
  }
  getDetails(request:any):Observable<any>{
    return this.httpClient.post("http://localhost:5009/metMuseum", request)
  }
}
