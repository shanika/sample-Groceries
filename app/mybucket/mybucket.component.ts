


import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";

import firebase = require("nativescript-plugin-firebase");

@Component({
  selector: "my-bucket",
  moduleId: module.id,
  templateUrl: "./mybucket.component.html",
  styleUrls: ["./mybucket-common.css", "./mybucket.component.css"],
})
export class MybucketComponent implements OnInit {
  
  constructor(private router: Router, 
              private page: Page){
      console.info('Mybucket page');
  }
  

  ngOnInit() {
    this.page.actionBarHidden = true;
  }

  public logout() {
    console.info('Logged out');
    firebase.logout();
    this.router.navigate(["/login"]);
  }
  
}
