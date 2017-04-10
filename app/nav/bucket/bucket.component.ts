import {Component, OnInit} from "@angular/core";
import {BucketItemService} from "../../shared/bucket.item.service";
import {LoginService} from "../../shared/login.service";
import {Router} from "@angular/router";

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
                private router: Router) {
    }

    ngOnInit() {
        this.loadUncheckedItems();
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
        this.router.navigate(["/bucketitem"]);
    }

    public getImageStyle(img) {
        return "background-image: url('" + img + "');"
    }
}
