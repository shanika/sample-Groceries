import {Component, OnInit, ViewChild, EventEmitter} from "@angular/core";
import {Label} from "ui/label";
import {StackLayout} from "ui/layouts/stack-layout";

@Component({
  selector: "filter-tag", 
  moduleId: module.id,
  inputs : ['name'],
  outputs : ['remove'],
  templateUrl: "./filtertag.component.html",
  styleUrls: ["./filtertag-common.css", "./filtertag.component.css"]
})
export class FiltertagComponent implements OnInit {
    
  public name: string;
  public remove: EventEmitter<string> = new EventEmitter();

  public tagWidth: number = 80;
  public color: string;

  public colors : any = ['#E57373','#9FA8DA','#90CAF9','#03A9F4','#009688','#4CAF50','#00C853','#FF8F00','#FF7043','#90A4AE'];

  @ViewChild("tagContainer") tagContainer: StackLayout;
  @ViewChild("tagName") tagName: Label;

  constructor() {
    //this.color = this.colors[Math.floor(Math.random() * 10)];
    this.color = "#BDBDBD";
  }

  ngOnInit() {
    this.tagWidth = this.tagName.width + 120;
  }

  public onRemove () {
    this.remove.next();
  }
}
