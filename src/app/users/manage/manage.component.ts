import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  userAddForm!: FormGroup;

  isUserFormSubmitted = false;
  id!: number;
  userDetails = {};
  userList: any = [];

  genderList = [
    { key: 'Male', value: 'male' },
    { key: 'Female', value: 'female' },
  ];
  roleList = [
    { key: 'User', value: 'user' },
    { key: 'Admin', value: 'admin' },
  ];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userAddForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      gender: ['male', Validators.required],
      role: ['user', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
    });
    let data: any = localStorage.getItem('user-data') || [];
    if (data && data.length) {
      this.userList = JSON.parse(data);
    }
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
    });
    if (this.id > 0) {
      this.userDetails = this.userList.filter(
        (res: any) => res.id === this.id
      )[0];
      this.userAddForm.patchValue(this.userDetails);
    }
  }

  isNumberKey(evt: any) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    if (this.userAddForm.value.mobile.length > 13) {
      return false;
    }
    return true;
  }

  get userFormControl() {
    return this.userAddForm.controls;
  }

  onSubmit() {
    this.isUserFormSubmitted = true;
    if (this.userAddForm.valid) {
      if (!this.id) {
        this.userList.push({
          ...this.userAddForm.value,
          id: this.userList.length + 1,
        });
        let prepareData = JSON.stringify(this.userList);
        localStorage.setItem('user-data', prepareData);
      } else {
        let index = this.userList.findIndex((res: any) => res.id === this.id);
        this.userList[index] = { ...this.userAddForm.value, id: this.id };
        let prepareData = JSON.stringify(this.userList);
        localStorage.setItem('user-data', prepareData);
      }
      this.router.navigate(['users/list']);
    }
  }
}
