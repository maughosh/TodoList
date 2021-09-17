import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDeatils } from './taskDetails';

@Injectable({
  providedIn: 'root',
})
export class ServiceDataService {

  // Adding the URL in the Variable
   url = 'https://jsonplaceholder.typicode.com/todos/';

  // Declaring HTTPClient in the constructor for using HTTP method
  constructor(private http: HttpClient) { }

  // get all details get()
  getData() {
    return this.http.get(this.url);
  }

  // Used post() for sending in the API and also sending body and header in the API
  addTask(data: any): Observable<any> {
    const header = { 'content-type': 'application/json' };
    return this.http.post<TaskDeatils[]>(this.url, data, { headers: header });
  }

  // Used delete() to Delete Data from the API
  deleteItem(id: number) {
    return this.http.delete(this.url + id);
  }
}
