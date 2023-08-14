import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractOverviewService {
  constructor(private _http: HttpClient) {}

 

  getContractOverviewList(): Observable<any> {
    return this._http.get('http://localhost:3000/contractoverviews');
  }

  
}
