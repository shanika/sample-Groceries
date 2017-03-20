


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

  public loading: boolean = false;
  public showSearchBar:boolean = false;
  public title:string = "My Bucket";
  public searchPhrase:string = "";
  public filterTags: string[] = ['New Zealand'];
  
  constructor(private router: Router, 
              private page: Page,
              private routerExtensions: RouterExtensions,
              private service: BucketItemService,
              private userService: LoginService){
      console.info('Mybucket page');  
  }
    

  ngOnInit() {
    this.loadItems();
  }

  public loadItems() {

    this.loading = true;
    this.service.getItems(this.userService.currentUser.uid, "").subscribe(
      (res) => {
        this.items = res;
        this.loading = false;
      }, 
      () => {
        console.error("Unable to fetch item data");
        this.loading = false;
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


  public onRemoveTagFilter(tag,i) {
    this.filterTags.splice(i, 1); 
    this.loadItems(); 
  }

  public getImageStyle(img) {
    return "background-image: url('" + img + "');"
  }

  public addItem(tag:string) {
    if(tag && tag.trim()) {
        this.filterTags.push(tag.trim());
    }
    this.searchPhrase = undefined;
    this.loadItems();
  }

  public goBack() {
    this.routerExtensions.backToPreviousPage();
  }
  
}
