import { Component } from '@angular/core';

import { trigger, state, style, transition, animate, keyframes, query } from '@angular/animations';

@Component({
    moduleId: module.id,
    selector: 'about',
    templateUrl: `about.component.html`,
})
export class AboutComponent  { 
    //options: Object;
    
    constructor() {
        //this.options = {
        //    title: { text: 'simple chart' },
        //    series: [{
        //        data: [29.9, 71.5, 106.4, 129],
        //    }]
        //};
    }
}