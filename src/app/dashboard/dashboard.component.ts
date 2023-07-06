import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any;

  constructor(private route: ActivatedRoute){

  }

  ngOnInit(): void {
    const user = this.route.snapshot.queryParamMap.get('user');
    this.user = user;
    console.log(user)
  }

}
