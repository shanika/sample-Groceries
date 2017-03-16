


import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import * as dialogs from "ui/dialogs";
import scrollViewModule = require("ui/scroll-view");

import firebase = require("nativescript-plugin-firebase");
import { BucketItemService } from "../shared/bucket.item.service";
import { LoginService } from "../shared/login.service";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: "public-bucket",
  moduleId: module.id,
  templateUrl: "./publicbucket.component.html",
  styleUrls: ["./publicbucket-common.css", "./publicbucket.component.css"]
})
export class PublicbucketComponent implements OnInit {

  items: any = []; 
  
  constructor(private router: Router, 
              private page: Page,
              private routerExtensions: RouterExtensions,
              private service: BucketItemService,
              private userService: LoginService){
      console.info('Mybucket page');  
  }
    

  ngOnInit() {
    this.loadUncheckedItems();
  }

  public loadUncheckedItems() {

    this.service.getItems(this.userService.currentUser.uid, "").subscribe(
      (res) => {
        this.items = res;
      }, 
      () => {
        console.error("Unable to fetch item data");
      }
    );
  }
 
  public onItemTap(item) {

    this.service.selectedItem = item;
    this.router.navigate(["/bucketitem"]);  
  }

  public onLogout() { 
    console.info("Loged out");
    firebase.logout();
    this.router.navigate(["/login"]); 
  }

  public more() {
    let options = {
      title: "Select Action",
      message: "Choose your acion",
      cancelButtonText: "Cancel",
      actions: ["Logout"]
    };
    dialogs.action(options).then((result) => {
      if(result === "Logout"){
        this.onLogout();  
      }
    });
  }

  public getImageStyle(img) {
    return "background-image: url('" + img + "');"
  }

  public goBack() {
    this.routerExtensions.backToPreviousPage();
  }
  
}
