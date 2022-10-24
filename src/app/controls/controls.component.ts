import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit ,OnChanges{
  @Output() increament=new EventEmitter<void>();
  @Output() decrement=new EventEmitter<void>();
  @Input() public decreseespeed:any;
inputdecrecevalue:any
  count= 0.001;
  rangevalue:any
  decrementvalue:any

  ramSelector:any
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.inputdecrecevalue=this.decreseespeed
  }



  ngOnInit(): void {
  

  }
  
  incrementCounter(e:any) {

    this.rangevalue = Number(e.target.value).toFixed(2);
   
console.log(this.rangevalue,'result');
  
  this.ramSelector=e.target.value
    this.increament.emit(this.rangevalue)
  }

  decrementCounter(val:any) {
    this.decrementvalue=Number(val.target.value).toFixed(2)
    
  this.ramSelector=val.target.value
  this.decrement.emit(this.decrementvalue)
  }

}
