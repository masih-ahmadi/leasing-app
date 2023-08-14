import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VehicleAddEditComponent } from '../vehicle-add-edit/vehicle-add-edit.component';
import { VehicleService } from '../service/vehicle.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
	displayedColumns: string[] = [

    'brand',
    'model',
    'modelYear',
    'vin',
    'price',   
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _vehicleService: VehicleService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getVehicleList();
  }

  openAddEditVehicleForm() {
    const dialogRef = this._dialog.open(VehicleAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVehicleList();
        }
      },
    });
  }

  getVehicleList() {
    this._vehicleService.getVehicleList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteVehicle(id: number) {
    this._vehicleService.deleteVehicle(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Vehicle deleted!', 'done');
        this.getVehicleList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(VehicleAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVehicleList();
        }
      },
    });
  }

}
