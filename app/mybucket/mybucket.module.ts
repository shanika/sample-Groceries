

import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { mybucketRouting } from "./mybucket.routing";
import { MybucketComponent } from "./mybucket.component";
import { BucketitemComponent } from "../bucketitem/bucketitem.component";
import { bucketitemRouting } from "../bucketitem/bucketitem.routing";
import { BucketItemService } from "../shared/bucket.item.service";
import { PublicbucketComponent } from "../publicbucket/publicbucket.component";
import { publicbucketRouting } from "../publicbucket/publicbucket.routing";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    mybucketRouting,
    bucketitemRouting,
    publicbucketRouting
  ],
  declarations: [
    MybucketComponent,
    BucketitemComponent,
    PublicbucketComponent
  ],
  providers: [BucketItemService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MybucketModule { }
