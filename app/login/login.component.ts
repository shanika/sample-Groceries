import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { connectionType, getConnectionType } from "connectivity";
import { Animation } from "ui/animation";
import { View } from "ui/core/view";
import { prompt } from "ui/dialogs";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";

import firebase = require("nativescript-plugin-firebase");

import { alert, LoginService, User, BackendService } from "../shared";


@Component({
  selector: "gr-login",
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ["./login-common.css", "./login.component.css"],
})
export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;
  isAuthenticating = false;
  isLoging = false;

  constructor(private router: Router,
    private userService: LoginService,
    private page: Page) {
    this.user = new User();
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }

  startBackgroundAnimation(background) {
    background.animate({
      scale: { x: 1.0, y: 1.0 },
      duration: 10000
    });
  }

  facebookLogin() {
    firebase.login({
      type: firebase.LoginType.FACEBOOK,
      scope: ['public_profile', 'email'] // optional: defaults to ['public_profile', 'email']
    }).then(
        function (result) {
          
        },
        function (errorMessage) {
          console.log(errorMessage);
        }
    );
  }

  googleLogin() {
    this.isLoging = true;
    firebase.login({
    type: firebase.LoginType.GOOGLE
    }).then(
        (result) => {

          let user = {
            "email": result.email,
            "name": result.name,
            "pic": result.profileImageURL,
            "uid": result.uid
          };

          this.userService.logedInEvent(user)
                    .subscribe( (res)=> {
                      this.userService.currentUser = res;
                      this.isLoging = false;
                      this.router.navigate(["/mybucket"]);
                    }, (errorMessage) => {
                        this.isLoging = false;
                        console.log(errorMessage);
                    });
        },
        (errorMessage) => {
          this.isLoging = false;
          console.log(errorMessage);
        }
    );
  }

}
