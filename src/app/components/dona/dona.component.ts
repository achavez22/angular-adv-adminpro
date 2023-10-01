import { Component, Input, OnInit } from '@angular/core';
// import { MultiDataSet, Label, Color } from 'ng2-charts';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit{
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{
      data: []
    }],
  };

  ngOnInit(): void {
   console.log(this.labels);
   console.log(this.data);
   this.doughnutChartData = {
    labels: this.labels,
    datasets: [
      { data: this.data }
    ],
   }
  }
  
  @Input() title: string = 'Sin titulo';

  @Input() labels: string[] = ['L1', 'L2', 'L3'];
  @Input() data: any[] = [350, 450, 100];
 
  
  public doughnutChartType: ChartType = 'doughnut';
  

}
