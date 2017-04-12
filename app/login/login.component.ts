import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Page} from "ui/page";
import {LoginService, User} from "../shared";

import firebase = require("nativescript-plugin-firebase");


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
                      this.router.navigate(["/nav", { transition: {
                          name : "fade"
                      } }]);
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
