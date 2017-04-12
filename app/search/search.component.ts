import {Component, ElementRef, ViewChild, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RouterExtensions} from "nativescript-angular";
import {BucketItemService} from "../shared/bucket.item.service";
import {Page} from "ui/page";
import {TextField} from "ui/text-field";

@Component({
    selector: "search-page",
    moduleId: module.id,
    templateUrl: "search.component.html",
    styleUrls: ["./search-common.css", "./search.component.css"]
})
export class SearchComponent implements OnInit{
    mode:string;


    @ViewChild("srch")
    searchElement: ElementRef;

    searchInput: TextField;

    ngOnInit(): void {
        this.searchInput = this.searchElement.nativeElement;
    }

    constructor(route: ActivatedRoute,
                private routerExtentions: RouterExtensions,
                private service: BucketItemService) {
        route.params.map( r => r["mode"]).subscribe( mode => this.mode = mode );
    }

    goBack() {

        this.searchInput.dismissSoftInput();
        if(this.mode == "bucket") {
            this.routerExtentions.navigate(["/nav/bucket"], { animated : false });
        }
    }

    addText(text: string){

        if(text) {
            this.service.bucketFilters.push(text.trim());
            console.info(this.service.bucketFilters.length)
        }

        this.routerExtentions.navigate(["/nav/bucket"], { animated : false });
    }

}
