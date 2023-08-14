import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ContractOverviewComponent } from './contract-overview/contract-overview.component';
import { LeasingContractComponent } from './leasing-contract/leasing-contract.component';
import { AppComponent } from './app.component';
const routes: Routes = [

{path:'customer', component:CustomerComponent},
{path:'vehicle', component:VehicleComponent},
{path:'contract-overview', component:ContractOverviewComponent},
{path:'leasing-contract', component:LeasingContractComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
