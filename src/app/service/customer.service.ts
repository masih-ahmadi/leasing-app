import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private _http: HttpClient) {}

  addCustomer(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/customer', data);
  }

  updateCustomer(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/customer/${id}`, data);
  }

  getCustomerList(): Observable<any> {
    return this._http.get('http://localhost:3000/customer');
  }

  deleteCustomer(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/customer/${id}`);
  }
}
