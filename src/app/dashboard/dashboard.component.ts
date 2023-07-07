import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userName: any;
  selectedDate: Date | undefined;
  today: Date = new Date();
  

  ngOnInit(): void {
   this.userName = sessionStorage.getItem('userName');
  }

}
