import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { authProviders, appRoutes } from "./app.routing";
import { AppComponent } from "./app.component";
import { setStatusBarColors, BackendService, LoginService } from "./shared";

import { LoginModule } from "./login/login.module";
import { MybucketModule } from "./mybucket/mybucket.module";
import {Router} from "@angular/router";
import { Location } from "@angular/common";
import {NavComponent} from "./nav/nav.component";
import {FeedComponent} from "./nav/feed/feed.component";
import {BucketComponent} from "./nav/bucket/bucket.component";
import {WorldComponent} from "./nav/world/world.component";
import {TripsComponent} from "./nav/trips/trips.component";

setStatusBarColors();

@NgModule({
  providers: [
    BackendService,
    LoginService,
    authProviders
  ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    LoginModule,
    MybucketModule
  ],
  declarations: [
      AppComponent,
      NavComponent,
      FeedComponent,
      BucketComponent,
      WorldComponent,
      TripsComponent
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {


  constructor(router: Router, private location: Location) {
    router.events.subscribe((e) => {
      console.log("--EVENT-->: " + e.toString());
    });
  }
}
