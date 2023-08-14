import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private _http: HttpClient) {}

  addVehicle(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/vehicle', data);
  }

  updateVehicle(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/vehicle/${id}`, data);
  }

  getVehicleList(): Observable<any> {
    return this._http.get('http://localhost:3000/vehicle');
  }
  getBrandList(): Observable<any> {
    return this._http.get('http://localhost:3000/brands');
  }
  getModelList(id:number): Observable<any> {
    return this._http.get('http://localhost:3000/brand/${id}/models');
  }
  deleteVehicle(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/vehicle/${id}`);
  }
}
