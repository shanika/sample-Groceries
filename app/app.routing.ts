import {AuthGuard} from "./auth-guard.service";
import {FeedComponent} from "./nav/feed/feed.component";
import {NavComponent} from "./nav/nav.component";
import {BucketComponent} from "./nav/bucket/bucket.component";

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
            {path: "bucket", component: BucketComponent}
        ]
    }
];
