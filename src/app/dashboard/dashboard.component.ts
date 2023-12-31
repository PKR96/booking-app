import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userName: any;
  disabled: boolean = false;
  selectedDate: any;
  today: Date = new Date();
  maxDate: Date= new Date();
  bookings: any[] = [];
  bookingDates: Date[] = [];
  times:any[]=[]
  selectedTime:string = '';
  mapOfDatesAndTimes:Map<string, string[]> = new Map<string,string[]>();
  formattedDate:string =''

  constructor(private restService: RestService,private router: Router){}
  

  ngOnInit(): void {
   this.userName = sessionStorage.getItem('user');
   this.bookings = [];
   this.bookingDates = [];
   this.times = [];
   this.maxDate.setMonth(this.today.getMonth() + 3)
   this.retrieveAvailableAppointments();
  }

  submitAppointment(): void{
    if(this.selectedDate && this.selectedTime){
      this.restService.bookAppointment('/bookings/'+this.formattedDate +'/'+ this.selectedTime)
      .subscribe({
        next:(data)=>{
        console.log("Data Saved")
        this.ngOnInit();
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err)
        }
    })
    }
  }

  logout():void{
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  private retrieveAvailableAppointments(): void{
    this.restService.retrieveAvailableBookingSlots()
    .subscribe({
      next:data =>{
      if(data && data.length > 0){
      Array.from(data).forEach(booking => this.bookings.push(booking))
      if(this.bookings.length > 0){
      let dateTimes: string[] = this.bookings.map(booking => booking.dateTime)
      if(dateTimes?.length > 0){
      this.mapOfDatesAndTimes = this.getMapOfDatesAndTimes(dateTimes);
      }
      }
      }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    })
  }

  populateDropdownFromSelectedDate(){
  this.times=[];
   this.formattedDate = this.selectedDate.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
   this.mapOfDatesAndTimes.get(this.formattedDate)?.forEach(time => this.times.push({label:time.slice(0,5),value:time}))
  }


  private getMapOfDatesAndTimes(datetimeList: string[]): Map<string, string[]>{
    const dateMap: Map<string, string[]> = new Map();
    datetimeList.forEach((datetime: string) => {
     const array:string[] = datetime.split('T');
     if(array && array.length === 2){
      const date: string = array[0];
      const time: string = array[1];

      if(dateMap.get(date)){
        dateMap.get(date)?.push(time)
      }
      else{
        dateMap.set(date,[time]);
      }
     }
    });
    return dateMap;
  }

}
