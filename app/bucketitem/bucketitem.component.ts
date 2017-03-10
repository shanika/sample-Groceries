


import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";

import firebase = require("nativescript-plugin-firebase");
import { BucketItemService } from "../shared/bucket.item.service";
import { Image } from "ui/image";
import { FlexboxLayout } from "ui/layouts/flexbox-layout";
import { ScrollEventData } from "ui/scroll-view";


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

  onScroll(args: ScrollEventData) {
        if (args.scrollY <= this.flex.getMeasuredHeight()) {
            this.image.animate({
                translate: { x: 0, y: args.scrollY * 0.3 }
            });
        }
    }
  
}
