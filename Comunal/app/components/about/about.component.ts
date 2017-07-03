import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'about',
    templateUrl: `about.component.html`,
})
export class AboutComponent  { 
    name = 'about Component 222 333 444 555'; 
    options: Object;

    constructor() {
        this.options = {
            title: { text: 'simple chart' },
            series: [{
                data: [29.9, 71.5, 106.4, 129],
            }]
        };
    }
}