import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptHttpModule} from "nativescript-angular/http";
import {NativeScriptRouterModule} from "nativescript-angular/router";

import {authProviders, appRoutes} from "./app.routing";
import {AppComponent} from "./app.component";
import {setStatusBarColors, BackendService, LoginService} from "./shared";

import {LoginModule} from "./login/login.module";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {NavComponent} from "./nav/nav.component";
import {FeedComponent} from "./nav/feed/feed.component";
import {BucketComponent} from "./nav/bucket/bucket.component";
import {WorldComponent} from "./nav/world/world.component";
import {TripsComponent} from "./nav/trips/trips.component";
import {SearchComponent} from "./search/search.component";
import {FiltertagComponent} from "./filtertag/filtertag.component";
import {BucketItemService} from "./shared/bucket.item.service";
import {BucketitemComponent} from "./bucketitem/bucketitem.component";

setStatusBarColors();

@NgModule({
    providers: [
        BackendService,
        LoginService,
        BucketItemService,
        authProviders
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(appRoutes),
        LoginModule
    ],
    declarations: [
        AppComponent,
        NavComponent,
        FeedComponent,
        BucketComponent,
        WorldComponent,
        TripsComponent,
        SearchComponent,
        FiltertagComponent,
        BucketitemComponent
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
