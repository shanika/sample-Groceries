


import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import * as dialogs from "ui/dialogs";
import scrollViewModule = require("ui/scroll-view");

import firebase = require("nativescript-plugin-firebase");
import { BucketItemService } from "../shared/bucket.item.service";
import { LoginService } from "../shared/login.service";

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
              private service: BucketItemService,
              private userService: LoginService){
      console.info('Mybucket page');  
  }
    

  ngOnInit() {
    this.loadUncheckedItems();
  }

  public loadUncheckedItems() {

    this.service.getMyUncheckedItems(this.userService.currentUser.uid).subscribe(
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
  
}
