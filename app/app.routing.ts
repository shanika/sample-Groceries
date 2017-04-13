import {AuthGuard} from "./auth-guard.service";
import {FeedComponent} from "./nav/feed/feed.component";
import {NavComponent} from "./nav/nav.component";
import {BucketComponent} from "./nav/bucket/bucket.component";
import {WorldComponent} from "./nav/world/world.component";
import {TripsComponent} from "./nav/trips/trips.component";
import {SearchComponent} from "./search/search.component";
import {BucketitemComponent} from "./bucketitem/bucketitem.component";

export const authProviders = [
    AuthGuard
];

export const appRoutes = [
    {path: "", redirectTo: "/login", pathMatch: "full"},
    {
        path: "nav", component: NavComponent,
        children: [
            {path: "", redirectTo: 'feed', pathMatch: "full"},
            {path: "feed", component: FeedComponent},
            {path: "bucket", component: BucketComponent},
            {path: "world", component: WorldComponent},
            {path: "trips", component: TripsComponent}
        ]
    },
    {path: "search/:mode", component : SearchComponent },
    {path: "item/:code", component : BucketitemComponent }
];
