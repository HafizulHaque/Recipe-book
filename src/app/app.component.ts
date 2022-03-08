import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedFeature : string;

  constructor(){
    this.selectedFeature = 'recipes';
  }

  onSelectedFeature(feature: string){
    this.selectedFeature = feature;
  }
}
