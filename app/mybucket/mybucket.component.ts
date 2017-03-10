


import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";

import firebase = require("nativescript-plugin-firebase");
import { BucketItemService } from "../shared/bucket.item.service";

@Component({
  selector: "my-bucket",
  moduleId: module.id,
  templateUrl: "./mybucket.component.html",
  styleUrls: ["./mybucket-common.css", "./mybucket.component.css"]
})
export class MybucketComponent implements OnInit {

  items: any = [];
  
  constructor(private router: Router, 
              private page: Page,
              private service: BucketItemService){
      console.info('Mybucket page');
  }
  

  ngOnInit() {
    this.loadUncheckedItems();
  }

  public loadUncheckedItems() {

    console.info("Calling service");
    this.service.getMyUncheckedItems().subscribe(
      (res) => {
        this.items = res;
      },
      () => {
        console.error("Unable to fetch item data");
      }
    );
  }

  public onItemTap(args) {

    this.service.selectedItem = this.items[args.index];
    this.router.navigate(["/bucketitem"]);
  }

  public onLogout() {
    console.info("Loged out");
    firebase.logout();
    this.router.navigate(["/login"]); 
  }
  
}
