import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContractAddEditComponent } from '../contract-add-edit/contract-add-edit.component';
import { ContractService } from '../service/contract.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
@Component({
  selector: 'app-leasing-contract',
  templateUrl: './leasing-contract.component.html',
  styleUrls: ['./leasing-contract.component.css']
})
export class LeasingContractComponent implements OnInit {
	displayedColumns: string[] = [

    'monthlyRate',
    'contractNo',
    'customer',
    'vehicle',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _contractService: ContractService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getContractList();
  }

  openAddEditContractForm() {
    const dialogRef = this._dialog.open(ContractAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getContractList();
        }
      },
    });
  }

  getContractList() {
    this._contractService.getContractList().subscribe({
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

  deleteContract(id: number) {
    this._contractService.deleteContract(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Contract deleted!', 'done');
        this.getContractList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(ContractAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getContractList();
        }
      },
    });
  }

}
