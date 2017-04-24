import {Component, OnInit} from "@angular/core";
import {BucketItemService} from "../../shared/bucket.item.service";
import {LoginService} from "../../shared/login.service";
import {Router} from "@angular/router";
import {RouterExtensions} from "nativescript-angular";
import {forEach} from "@angular/router/src/utils/collection";

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

        if(this.service.refilterWorld || !this.service.world.length) {
            this.service.refilterWorld = false;
            this.loadItems();
        }
    }

    public loadItems() {

        this.loading = true;
        this.service.filterItems(this.userService.currentUser.uid, this.service.worldFilters).subscribe(
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
        this.router.navigate(["/item/abc"]);
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

    public getTags(tags){
        let tagsStr = ""
        tags.forEach( (tag) => {
            tagsStr += '#' + tag.name + ' ';
        });
        return tagsStr;
    }
}
