import { Component } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styles: [
  ]
})
export class GraphicsComponent {

  public labels1: string[] = ['Pan', 'Refresco', 'Tacos'];
  public data1 =[10, 15, 40];


  public labels2: string[] = ['Pan', 'Refresco', 'Tacos'];
  public data2 =[10, 110, 70];
}
