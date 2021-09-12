import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { taskDeatils } from './taskDetails';


@Injectable({
  providedIn: 'root'
})
export class ServiceDataService {
 private url= "https://jsonplaceholder.typicode.com/todos/";
  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get(this.url);
  }

  addTask():Observable<any>{
const header={'content-type':'application/json'};
const body=JSON.stringify({
  "userId":11,
  "title":"need to eat",
  "completed":true
})
return this.http.post<taskDeatils[]>(this.url,body,{'headers':header});
  }
}
