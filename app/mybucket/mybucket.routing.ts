import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MybucketComponent } from "./mybucket.component";

const mybucketRoutes: Routes = [
  { path: "mybucket", component: MybucketComponent },
];
export const mybucketRouting: ModuleWithProviders = RouterModule.forChild(mybucketRoutes);