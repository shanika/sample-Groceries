

import { Injectable, NgZone } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class BucketItemService {

    public selectedItem: any;

    constructor(private http: Http, private zone: NgZone) { 
    }

    public getMyUncheckedItems(uid) {
        console.info("Inside service");
        let headers = this.getHeaders();
        return this.http.get("http://192.168.1.7:8080/users/" + uid + "/items?checked=false", {
            "headers": headers
        })
        .map(res => res.json())
        .catch(this.handleErrors); 
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    }

    private handleErrors(error: Response) {
        console.log(error);
        return Observable.throw(error);
    } 

}