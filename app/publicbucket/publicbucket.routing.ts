import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PublicbucketComponent } from "./publicbucket.component";

const publicbucketRoutes: Routes = [
  { path: "publicbucket", component: PublicbucketComponent },
];
export const publicbucketRouting: ModuleWithProviders = RouterModule.forChild(publicbucketRoutes);