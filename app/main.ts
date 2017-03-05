import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { AppModule } from "./app.module";
import firebase = require("nativescript-plugin-firebase");

firebase.init({
  onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when he re-visits your app
      console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
      if (data.loggedIn) {
        console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
      }
    }
}).then(
  (instance) => {
    console.log("firebase.init done");
  },
  (error) => {
    console.log("firebase.init error: " + error);
  }
);

platformNativeScriptDynamic().bootstrapModule(AppModule);