import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RouterExtensions} from "nativescript-angular";
import {BucketItemService} from "../shared/bucket.item.service";
import {Page} from "ui/page";

@Component({
    selector: "search-page",
    moduleId: module.id,
    templateUrl: "search.component.html",
    styleUrls: ["./search-common.css", "./search.component.css"]
})
export class SearchComponent {

    mode:string;

    constructor(route: ActivatedRoute,
                private routerExtentions: RouterExtensions,
                private service: BucketItemService) {
        route.params.map( r => r["mode"]).subscribe( mode => this.mode = mode );
    }

    goBack() {

        if(this.mode == "bucket") {
            this.routerExtentions.navigate(["/nav/bucket"], { transition: {
                name : "fade"
            } });
        }
    }

    addText(text: string){

        if(text) {
            this.service.bucketFilters.push(text.trim());
            console.info(this.service.bucketFilters.length)
        }

        this.routerExtentions.navigate(["/nav/bucket"], { transition: {
            name : "fade"
        } });
    }

}
