import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor(private _http: HttpClient) {}

  addContract(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/contract', data);
  }

  updateContract(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/contract/${id}`, data);
  }

  getContractList(): Observable<any> {
    return this._http.get('http://localhost:3000/contract');
  }

  deleteContract(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/contract/${id}`);
  }
}
