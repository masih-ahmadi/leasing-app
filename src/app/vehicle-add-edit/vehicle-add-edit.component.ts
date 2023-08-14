import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { VehicleService } from '../service/vehicle.service';

@Component({
  selector: 'app-vehicle-add-edit',
  templateUrl: './vehicle-add-edit.component.html',
  styleUrls: ['./vehicle-add-edit.component.scss'],
})
export class VehicleAddEditComponent implements OnInit {
  vehicleForm: FormGroup;

  brand: any;
  model: any;
  selectedOption: number =0;
  brandChange(e:any){
    this.selectedOption = e.value;

    this._vehicleService.getModelList(this.selectedOption).subscribe({
      next: (res) => {
        this.brand = res;
        
      },
      error: console.log,
    });
  
    
  }
  constructor(
    private _fb: FormBuilder,
    private _vehicleService: VehicleService,
    private _dialogRef: MatDialogRef<VehicleAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.vehicleForm = this._fb.group({
      brand: '',
      model: '',
      modelYear: '',
      vin: '',
      price: '',
    });
  }
getBrandList() {
    this._vehicleService.getBrandList().subscribe({
      next: (res) => {
        this.brand = res;
        
      },
      error: console.log,
    });
  }
  ngOnInit(): void {
    this.vehicleForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.vehicleForm.valid) {
      if (this.data) {
        this._vehicleService
          .updateVehicle(this.data.id, this.vehicleForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Vehicle detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._vehicleService.addVehicle(this.vehicleForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Vehicle added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
