import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { ContractService } from '../service/contract.service';
import { CustomerService } from '../service/customer.service';
import { VehicleService } from '../service/vehicle.service';
@Component({
  selector: 'app-contract-add-edit',
  templateUrl: './contract-add-edit.component.html',
  styleUrls: ['./contract-add-edit.component.scss'],
})
export class ContractAddEditComponent implements OnInit {
  contractForm: FormGroup;
  customerList :any;
  vehicleList :any;

  constructor(
    private _fb: FormBuilder,
      private _customerService: CustomerService,
    private _contractService: ContractService,
     private _vehicleService: VehicleService,
    private _dialogRef: MatDialogRef<ContractAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.contractForm = this._fb.group({
      contractNo: '',
      monthlyRate: '',
      customer: '',
      vehicle: '',
    });
  }

 getCustomerList() {

    this._customerService.getCustomerList().subscribe({
      next: (res) => {
        this.customerList = res;
      
      },
      error: console.log,
    });
  }
  getVehicleList() {
    this._vehicleService.getVehicleList().subscribe({
      next: (res) => {
        this.vehicleList = res;
      },
      error: console.log,
    });
  }
  ngOnInit(): void {
    this.contractForm.patchValue(this.data);
     this.getCustomerList();
     this.getVehicleList();
  }

  onFormSubmit() {
    if (this.contractForm.valid) {
      if (this.data) {
        this._contractService
          .updateContract(this.data.id, this.contractForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Contract detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._contractService.addContract(this.contractForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Contract added successfully');
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
