import { Component, OnInit } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graphs',
  standalone: true,
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  userGrowthChart: Chart | undefined;
  activeStatusChart: Chart | undefined;
  cvUploadChart: Chart | undefined;

  constructor(private graphService: GraphService) {}

  ngOnInit(): void {
    this.loadUserGrowthChart();
    this.loadActiveStatusChart();
    this.loadCvUploadChart();
  }

  loadUserGrowthChart(): void {
    this.graphService.getUserGrowthData().subscribe(data => {
      this.userGrowthChart = new Chart('userGrowthChart', {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'User Growth Over Time',
            data: data.values,
            borderColor: '#10a37f',
            fill: false
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }

  loadActiveStatusChart(): void {
    this.graphService.getActiveStatusData().subscribe(data => {
      this.activeStatusChart = new Chart('activeStatusChart', {
        type: 'pie',
        data: {
          labels: data.labels,
          datasets: [{
            data: data.values,
            backgroundColor: ['#10a37f', '#d9534f'],
          }]
        },
        options: {
          responsive: true
        }
      });
    });
  }

  loadCvUploadChart(): void {
    this.graphService.getCvUploadData().subscribe(data => {
      this.cvUploadChart = new Chart('cvUploadChart', {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'CV Uploads',
            data: data.values,
            backgroundColor: '#4CAF50',
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }
}