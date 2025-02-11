import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyRequestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  busy() {
    this.busyRequestCount++;
    this.spinnerService.show(undefined, {
      type: 'ball-spin-clockwise', //'line-scale-party'
      //bdColor: 'rgba(255, 255, 255, 0)',
      color: "#489fe5", //'#333333',
      fullScreen: true,
      size: "medium",

      // type: 'ball-clip-rotate-multiple',
      // bdColor: 'rgba(255, 255, 255, 0)',
      // color: '#489fe5',
      // size: "medium",
      // fullScreen: true
    });
  }

  idle(){
    this.busyRequestCount--;
    if(this.busyRequestCount <= 0){
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
