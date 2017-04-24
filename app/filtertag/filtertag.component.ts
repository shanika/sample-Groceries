import {Component, OnInit, ViewChild, EventEmitter} from "@angular/core";
import {Label} from "ui/label";
import {StackLayout} from "ui/layouts/stack-layout";

@Component({
  selector: "filter-tag", 
  moduleId: module.id,
  inputs : ['name', 'margin'],
  outputs : ['remove'],
  templateUrl: "./filtertag.component.html",
  styleUrls: ["./filtertag-common.css", "./filtertag.component.css"]
})
export class FiltertagComponent implements OnInit {
    
  public name: string;
  public margin: number = 0;
  public remove: EventEmitter<string> = new EventEmitter();

  public tagWidth: number = 80;
  public color: string;

  @ViewChild("tagContainer") tagContainer: StackLayout;
  @ViewChild("tagName") tagName: Label;

  constructor() {
    this.color = "#BDBDBD";
  }

  ngOnInit() {
    this.tagWidth = this.tagName.width + 120;
  }

  public onRemove () {
    this.remove.next();
  }
}
