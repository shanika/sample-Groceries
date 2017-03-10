

import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { mybucketRouting } from "./mybucket.routing";
import { MybucketComponent } from "./mybucket.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    mybucketRouting
  ],
  declarations: [
    MybucketComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MybucketModule { }
