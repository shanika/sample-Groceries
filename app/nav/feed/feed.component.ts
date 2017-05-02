import {Component, OnInit} from "@angular/core";
import {BucketItemService} from "../../shared/bucket.item.service";

@Component({
    selector: "nav-feed",
    moduleId: module.id,
    templateUrl: "./feed.component.html",
    styleUrls: ["./feed-common.css", "./feed.component.css"]
})
export class FeedComponent implements OnInit{

    private actions = [];

    ngOnInit(): void {
        this.loadActions();
    }

    constructor(private service: BucketItemService) {

    }

    private loadActions() {
        this.service.loadActions().subscribe( (actions) => {
            this.actions = actions;
        }, ()=> {
            console.info("Unable to load actions");
        });
    }

    public getImageStyle(img) {
        return "background-image: url('" + img + "');"
    }
}
