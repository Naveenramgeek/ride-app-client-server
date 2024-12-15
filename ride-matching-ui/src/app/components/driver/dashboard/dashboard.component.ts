import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  isBrowser: boolean; 
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Check if running in browser
  }
  // Bar Chart
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  public barChartLabels: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [12, 19, 3, 5, 2, 3, 7], label: 'Rides Completed' },
      { data: [2, 3, 1, 4, 1, 2, 1], label: 'Cancellations' },
    ],
  };

  // Line Chart
  public lineChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  public lineChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  public lineChartType: ChartType = 'line';
  public lineChartData: ChartData<'line'> = {
    labels: this.lineChartLabels,
    datasets: [
      {
        data: [100, 200, 150, 300, 250, 400],
        label: 'Earnings ($)',
        borderColor: '#42A5F5',
        fill: true,
        tension: 0.5,
        backgroundColor: 'rgba(66,165,245,0.2)',
      },
    ],
  };
}
