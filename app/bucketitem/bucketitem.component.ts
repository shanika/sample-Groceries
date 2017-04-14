import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Page} from "ui/page";
import * as dialogs from "ui/dialogs";
import {BucketItemService} from "../shared/bucket.item.service";
import {RouterExtensions} from "nativescript-angular/router";
import {LoginService} from "../shared/login.service";
import firebase = require("nativescript-plugin-firebase");

const ADD_ICON: string = "res://ic_add";
const BUCKET_ICON: string = "res://ic_bucket_white";
const CHECK_ICON: string = "res://ic_check_white";

@Component({
selector: "bucket-item",
moduleId: module.id,
templateUrl: "./bucketitem.component.html",
styleUrls: ["./bucketitem-common.css", "./bucketitem.component.css"]
})
export class BucketitemComponent implements OnInit {

  public busy: boolean = false;
  public actionIcon: string = ADD_ICON;

  constructor(private router: Router,
              private routerExtensions: RouterExtensions, 
              private page: Page,
              private service: BucketItemService,
              private userService: LoginService){
      console.info('Bucket item page'); 
  }
  

  ngOnInit() {
    this.page.actionBarHidden = true;
    if(this.service.selectedItem.bucketed) {
      if(this.service.selectedItem.checked) {
        this.actionIcon = CHECK_ICON;
      } else {
        this.actionIcon = BUCKET_ICON;
      }
    }
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

  private addToBucket(){
    this.busy = true;
    this.actionIcon = BUCKET_ICON;
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

  private removeFromBucket(){
    this.busy = true;
    this.actionIcon = ADD_ICON;
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

  public addRemoveItem() {
    if(!this.service.selectedItem.checked) {
      if(this.service.selectedItem.bucketed) {
        this.removeFromBucket();
      } else {
        this.addToBucket();
      }
    }
  }

  public goBack() {
    this.routerExtensions.backToPreviousPage();
  }

  public getImageStyle(img) {
    return "background-image: url('" + img + "');"
  }
  
}
