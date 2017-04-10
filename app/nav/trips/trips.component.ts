import {Component, OnInit} from "@angular/core";

@Component({
    selector: "nav-trips",
    moduleId: module.id,
    templateUrl: "trips.component.html",
    styleUrls: ["trips-common.css", "./trips.component.css"]
})
export class TripsComponent implements OnInit{

    ngOnInit(): void {
        console.info("Trips component loaded");
    }

    constructor() {

    }
}
