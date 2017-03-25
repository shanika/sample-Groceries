import { Injectable } from "@angular/core";
import { getString, setString } from "application-settings";

const apiUrlKey = "tbapi";

export class BackendService {
  static apiUrl = "http://staging.travelsocio.com"; 

  static get api(): string {
    return getString(apiUrlKey);
  }

  static set api(apiUrl: string) {
    setString(apiUrlKey, apiUrl);
  }
}
