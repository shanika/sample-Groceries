import {Component, OnInit} from "@angular/core";

@Component({
    selector: "nav-bucket",
    moduleId: module.id,
    templateUrl: "bucket.component.html",
    styleUrls: ["./bucket-common.css", "./bucket.component.css"]
})
export class BucketComponent implements OnInit{

    ngOnInit(): void {
        console.info("Bucket component loaded");
    }

    constructor() {

    }
}
