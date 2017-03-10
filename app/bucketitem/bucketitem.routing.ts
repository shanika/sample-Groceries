import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BucketitemComponent } from "./bucketitem.component";

const bucketitemRoutes: Routes = [
  { path: "bucketitem", component: BucketitemComponent },
];
export const bucketitemRouting: ModuleWithProviders = RouterModule.forChild(bucketitemRoutes);