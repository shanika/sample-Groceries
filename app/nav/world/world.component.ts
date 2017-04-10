import {Component, OnInit} from "@angular/core";

@Component({
    selector: "nav-world",
    moduleId: module.id,
    templateUrl: "world.component.html",
    styleUrls: ["./world-common.css", "./world.component.css"]
})
export class WorldComponent implements OnInit{

    ngOnInit(): void {
        console.info("World component loaded");
    }

    constructor() {

    }
}
