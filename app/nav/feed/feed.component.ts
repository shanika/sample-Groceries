import {Component, OnInit} from "@angular/core";

@Component({
    selector: "nav-feed",
    moduleId: module.id,
    templateUrl: "./feed.component.html",
    styleUrls: ["./feed-common.css", "./feed.component.css"]
})
export class FeedComponent implements OnInit{

    ngOnInit(): void {
        console.info("Feed component loaded");
    }

    constructor() {

    }
}
