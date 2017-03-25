

import { Injectable, NgZone } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { BackendService } from "./backend.service";


@Injectable()
export class BucketItemService {

    public selectedItem: any;
    public selectedIndex: number;
    public myBucket:any = [];
    public bucketFilters = [];

    constructor(private http: Http, private zone: NgZone) { 
    }

    public getItems(uid, checked) {
        console.info("Inside service");
        let headers = this.getHeaders();
        return this.http.get(BackendService.apiUrl + "/users/" + uid + "/items" + checked, {
            "headers": headers
        })
        .map(res => res.json())
        .catch(this.handleErrors); 
    }

    public addToBucket(user, item) {
        let headers = this.getHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.post( BackendService.apiUrl + "/users/" + user.uid + "/items/"  + item.id, {}, options)
            .map(res => res.json())
            .catch(this.handleErrors); ;
    }

    public removeFromBucket(user, item) {
        let headers = this.getHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.post( BackendService.apiUrl + "/users/" + user.uid + "/delete/items/"  + item.id, {}, options)
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