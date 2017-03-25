import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { AppModule } from "./app.module";
import firebase = require("nativescript-plugin-firebase");
import { BackendService } from "./shared/backend.service";

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
    setUpConfig ();
  },
  (error) => {
    console.log("firebase.init error: " + error);
  }
);

function setUpConfig () {
  console.info("Configuring...");
  firebase.getRemoteConfig({
    developerMode: true, // play with this boolean to get more frequent updates during development
    cacheExpirationSeconds: 600, // 10 minutes, default is 12 hours.. set to a lower value during dev
    properties: [{
      key: "api_url",
      default: "http://192.168.1.7:8080"
    }]
  }).then(
      (result:any) => { 
        BackendService.api = result.properties.api_url
      }
  );
}


platformNativeScriptDynamic().bootstrapModule(AppModule);