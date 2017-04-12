import {Component, OnInit} from "@angular/core";
import {BucketItemService} from "../../shared/bucket.item.service";
import {LoginService} from "../../shared/login.service";
import {Router} from "@angular/router";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: "nav-world",
    moduleId: module.id,
    templateUrl: "world.component.html",
    styleUrls: ["./world-common.css", "./world.component.css"]
})
export class WorldComponent implements OnInit{

    private loading: boolean;
    items: any = [];

    constructor(private service: BucketItemService,
                private userService: LoginService,
                private router: Router,
                private routerExtentions: RouterExtensions) {
    }

    ngOnInit() {

        if(!this.service.world.length) {
            this.loadItems();
        }
    }

    public loadItems() {

        this.loading = true;
        this.service.getItems(this.userService.currentUser.uid, "").subscribe(
            (res) => {
                this.service.world = res;
                this.loading = false;
            },
            () => {
                console.error("Unable to fetch item data");
                this.loading = false;
            }
        );
    }

    public onItemTap(item, index) {
        this.service.selectedIndex = index;
        this.service.selectedItem = item;
        this.router.navigate(["/bucketitem"]);
    }

    public onRemoveTagFilter(tag,i) {
        this.service.worldFilters.splice(i, 1);
        this.loadItems();
    }

    public addSearchCriteria() {
        this.routerExtentions.navigate(["/search/world"], { transition: {
            name : "fade"
        } });
    }

    public getImageStyle(img) {
        return "background-image: url('" + img + "');"
    }
}
