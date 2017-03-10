

import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { mybucketRouting } from "./mybucket.routing";
import { MybucketComponent } from "./mybucket.component";
import { BucketitemComponent } from "../bucketitem/bucketitem.component";
import { bucketitemRouting } from "../bucketitem/bucketitem.routing";
import { BucketItemService } from "../shared/bucket.item.service";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    mybucketRouting,
    bucketitemRouting
  ],
  declarations: [
    MybucketComponent,
    BucketitemComponent
  ],
  providers: [BucketItemService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MybucketModule { }
