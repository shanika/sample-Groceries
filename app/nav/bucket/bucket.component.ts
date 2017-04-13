import {Component, OnInit} from "@angular/core";
import {BucketItemService} from "../../shared/bucket.item.service";
import {LoginService} from "../../shared/login.service";
import {Router} from "@angular/router";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: "nav-bucket",
    moduleId: module.id,
    templateUrl: "bucket.component.html",
    styleUrls: ["./bucket-common.css", "./bucket.component.css"]
})
export class BucketComponent implements OnInit{

    private loading: boolean;

    constructor(private service: BucketItemService,
                private userService: LoginService,
                private router: Router,
                private routerExtentions: RouterExtensions) {
    }

    ngOnInit() {

        if(!this.service.myBucket.length) {
            this.loadUncheckedItems();
        }

        console.info(this.service.bucketFilters.length);
    }

    public loadUncheckedItems() {

        this.loading = true;
        this.service.getItems(this.userService.currentUser.uid, "?checked=false").subscribe(
            (res) => {
                this.loading = false;
                this.service.myBucket = res;
            },
            () => {
                this.loading = false;
                console.error("Unable to fetch item data");
            }
        );
    }

    public onItemTap(item, index) {
        this.service.selectedIndex = index;
        this.service.selectedItem = item;
        this.router.navigate(["/item/abc"]);
    }

    public onRemoveTagFilter(tag,i) {
        this.service.bucketFilters.splice(i, 1);
        this.loadUncheckedItems();
    }

    public addSearchCriteria() {
        this.routerExtentions.navigate(["/search/bucket"], { transition: {
            name : "fade"
        } });
    }

    public getImageStyle(img) {
        return "background-image: url('" + img + "');"
    }
}
