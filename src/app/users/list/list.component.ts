import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  userList: any = [];
  showList: any = [];
  roleFilter = new FormControl();
  genderFilter = new FormControl();

  genderList = [
    { key: 'Male', value: 'male' },
    { key: 'Female', value: 'female' },
  ];
  roleList = [
    { key: 'User', value: 'user' },
    { key: 'Admin', value: 'admin' },
  ];

  constructor() {}
  ngOnInit(): void {
    let data: any = localStorage.getItem('user-data') || [];
    if (data && data.length) {
      this.userList = JSON.parse(data);
      this.showList = this.userList;
    }
    this.genderFilter.valueChanges.subscribe((res) => {
      this.applyFilters();
    });
    this.roleFilter.valueChanges.subscribe((res) => {
      this.applyFilters();
    });
  }

  applyFilters() {
    if (this.roleFilter.value) {
      this.showList = this.showList.filter(
        (res: any) => res.role === this.roleFilter.value
      );
    }
    if (!this.roleFilter.value) {
      this.showList = this.userList;
    }
    if (this.genderFilter.value) {
      this.showList = this.showList.filter(
        (res: any) => res.gender === this.genderFilter.value
      );
    }
    if (!this.genderFilter.value) {
      this.showList = this.showList;
    }

    if (!this.roleFilter.value && !this.genderFilter.value) {
      this.showList = this.userList;
    }
  }
}
