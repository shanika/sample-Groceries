


import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import * as dialogs from "ui/dialogs";

import firebase = require("nativescript-plugin-firebase");
import { BucketItemService } from "../shared/bucket.item.service";
import { Image } from "ui/image";
import { FlexboxLayout } from "ui/layouts/flexbox-layout";
import { ScrollEventData } from "ui/scroll-view";
import { RouterExtensions } from "nativescript-angular/router";
import { LoginService } from "../shared/login.service";


@Component({
  selector: "bucket-item", 
  moduleId: module.id,
  templateUrl: "./bucketitem.component.html",
  styleUrls: ["./bucketitem-common.css", "./bucketitem.component.css"]
})
export class BucketitemComponent implements OnInit {

  public busy: boolean = false;


  
  constructor(private router: Router,
              private routerExtensions: RouterExtensions, 
              private page: Page,
              private service: BucketItemService,
              private userService: LoginService){
      console.info('Bucket item page'); 
  }
  

  ngOnInit() {
    this.page.actionBarHidden = true;
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
        this.onLogout()
      }
    });
  }

  public addToBucket(){ 
    this.busy = true;
    this.service.addToBucket(this.userService.currentUser, this.service.selectedItem)
    .subscribe(
      () => {
        this.service.selectedItem['bucketed'] = true;
        this.busy = false;
        this.service.myBucket.push(this.service.selectedItem);
        this.service.selectedIndex = this.service.myBucket.length - 1;
      },
      () => {
        this.busy = false;
        console.error("Failed to add item to bucket");
      }
    );
  }

  public removeFromBucket(){ 
    this.busy = true;
    this.service.removeFromBucket(this.userService.currentUser, this.service.selectedItem)
    .subscribe(
      () => {
        this.service.selectedItem['bucketed'] = false;
        this.busy = false;
        this.service.myBucket.splice(this.service.selectedIndex, 1);
      },
      () => {
        this.busy = false;
        console.error("Failed to remove item to bucket");
      }
    ); 
  }

  public goBack() {
    this.routerExtensions.backToPreviousPage();
  }

  public getImageStyle(img) {
    return "background-image: url('" + img + "');"
  }
  
}
