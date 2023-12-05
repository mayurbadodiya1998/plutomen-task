import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'plutomen-task';
  ngOnInit(): void {
    // let userData: any = localStorage.getItem('user-data');
    // localStorage.setItem(
    //   'user-data',
    //   JSON.stringify(userData && userData.length ? userData : null)
    // );
  }
}
