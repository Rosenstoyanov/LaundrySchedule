import { Component, OnInit } from '@angular/core';
import { LaundryService } from '../services/laundry.service';
import { Laundry } from '../models/laundry';
import { ResponseModel } from '../models/response.model';

@Component({
  selector: 'app-laundy-list',
  templateUrl: './laundy-list.component.html',
  styleUrls: ['./laundy-list.component.css']
})
export class LaundyListComponent implements OnInit {
  private laundtyList: Laundry[]
  private userToken: string

  constructor(private laundryService: LaundryService) {
    console.log("Laundry constructor called")
    let loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (loggedUser) {
      this.userToken = loggedUser.token
      laundryService.layndries(loggedUser.token)
        .subscribe((laundies: Laundry[]) => {
          if (laundies && laundies.length) {
            this.laundtyList = laundies
          }
        });
    }
  }

  ngOnInit() {
    console.log("Laundry ngOnInit called")
  }

  bookLaundry(laundry: Laundry) {
    console.log(this.userToken);
    let loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    this.laundryService.bookLaundry(loggedUser.token, laundry._id)
      .subscribe((responseModel: ResponseModel) => {
        console.log("Response: " + JSON.stringify(responseModel))
        console.log("Laundry: " + JSON.stringify(laundry))
        laundry.booked = responseModel.isSuccess;
        if (!responseModel.isSuccess) {
          alert(responseModel.message)
        }
      })
  }
}
