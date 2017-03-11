


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


@Component({
  selector: "bucket-item",
  moduleId: module.id,
  templateUrl: "./bucketitem.component.html",
  styleUrls: ["./bucketitem-common.css", "./bucketitem.component.css"]
})
export class BucketitemComponent implements OnInit {

  public image: Image;
  public flex: FlexboxLayout;

  @ViewChild("img") img: ElementRef;
  @ViewChild("content") content: ElementRef;
  
  constructor(private router: Router,
              private routerExtensions: RouterExtensions, 
              private page: Page,
              private service: BucketItemService){
      console.info('Bucket item page'); 
  }
  

  ngOnInit() {
    this.image = this.img.nativeElement;
    this.flex = this.content.nativeElement;
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

  onScroll(args: ScrollEventData) {
        if (args.scrollY <= this.flex.getMeasuredHeight()) {
            this.image.animate({
                translate: { x: 0, y: args.scrollY * 0.3 }
            });
        }
  }

  public goBack() {
    this.routerExtensions.backToPreviousPage();
  }
  
}
