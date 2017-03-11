

import { Injectable, NgZone } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class LoginService {

  public currentUser: any;
  
  constructor(private http: Http, private zone: NgZone) { 
  }

  public logedInEvent(user) {
    
      let headers = this.getHeaders();
      let options = new RequestOptions({ headers: headers });
      return this.http.post("http://192.168.1.7:8080/event/logedIn", user, options)
            .map(res => res.json())
            .catch(this.handleErrors); ;
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
