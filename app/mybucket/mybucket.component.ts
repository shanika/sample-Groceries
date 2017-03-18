


import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import * as dialogs from "ui/dialogs";
import scrollViewModule = require("ui/scroll-view");

import firebase = require("nativescript-plugin-firebase");
import { BucketItemService } from "../shared/bucket.item.service";
import { LoginService } from "../shared/login.service";
import { SearchBar } from "ui/search-bar";

@Component({
  selector: "my-bucket",
  moduleId: module.id,
  templateUrl: "./mybucket.component.html",
  styleUrls: ["./mybucket-common.css", "./mybucket.component.css"]
})
export class MybucketComponent implements OnInit { 
  
  constructor(private router: Router, 
              private page: Page,
              private service: BucketItemService,
              private userService: LoginService){
      console.info('Mybucket page');  
  }
  
  public loading: boolean = false;
  public showSearchBar:boolean = false;
  public title:string = "My Bucket";
  public searchPhrase:string = "";
  @ViewChild("sb") searchBar: SearchBar;

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

  public onAddIconClick() {
    this.router.navigate(["/publicbucket"]); 
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

  public searchMode() {
    this.title = null;
    this.showSearchBar = true;
  }

  public onRemoveTagFilter(tag,i) {
    this.service.bucketFilters.splice(i, 1); 
    this.loadUncheckedItems(); 
  }

  public getImageStyle(img) {
    return "background-image: url('" + img + "');"
  }

  public addItem(tag:string) {
    if(tag && tag.trim()) {
        this.service.bucketFilters.push(tag.trim());
    }
    this.searchPhrase = undefined;
    this.loadUncheckedItems();
  }

  public goBack() {
    this.title = "My Bucket"
    this.showSearchBar = false;
  }
  
}
