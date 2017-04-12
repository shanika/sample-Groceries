import {Component} from "@angular/core";
import {registerElement} from "nativescript-angular";
import {BottomBar, BottomBarItem, TITLE_STATE, SelectedIndexChangedEventData} from "nativescript-bottombar";
import "rxjs/add/operator/map";
import {ActivatedRoute, Router} from "@angular/router";
import {Page} from "ui/page";
import {Location} from "@angular/common";
import {LoginService} from "../shared/login.service";

registerElement('BottomBar', () => BottomBar);

@Component({
    selector: "main-nav",
    moduleId: module.id,
    templateUrl: "./nav.component.html",
    styleUrls: ["./nav-common.css", "./nav.component.css"]
})
export class NavComponent {

    public selectedIndex: number;
    public hidden: boolean;
    public titleState: TITLE_STATE;

    public actionTitle: string = "TravelSocio";

    public items: Array<BottomBarItem> = [
        new BottomBarItem(0, "Feed", "ic_feed", "#009688"),
        new BottomBarItem(1, "My Bucket", "ic_bucket", "#009688"),
        new BottomBarItem(2, "World", "ic_world", "#009688"),
        new BottomBarItem(3, "Trips", "ic_trip", "#009688")
    ];

    constructor(private router: Router) {

        this.selectedIndex = 0;
        this.hidden = false;
        this.titleState = TITLE_STATE.ALWAYS_SHOW;



        var url: string = this.router.url.split(";")[0];
        console.info("route " + url);
        if (url == "/nav/feed") {
            this.selectedIndex = 0;
        } else if (url == "/nav/bucket") {
            this.selectedIndex = 1;
        } else if (url == "/nav/world") {
            this.selectedIndex = 2;
        } else {
            this.selectedIndex = 3;
        }

        console.info("bb index " + this.selectedIndex);
    }

    tabSelected(args: SelectedIndexChangedEventData) {

        if (args.newIndex !== args.oldIndex) {
            this.navigate(args.newIndex);
        }
    }

    private navigate(index) {

        switch (index) {
            case 0:
                this.actionTitle = "TravelSocio";
                this.router.navigate(["/nav/feed"]);
                break;
            case 1:
                this.actionTitle = "My Bucket";
                this.router.navigate(["/nav/bucket"]);
                break;
            case 2:
                this.actionTitle = "World"
                this.router.navigate(["/nav/world"]);
                break;
            case 3:
                this.actionTitle = "Trips"
                this.router.navigate(["/nav/trips"]);
                break;
        }

    }

    bottomBarLoaded() {

    }
}
