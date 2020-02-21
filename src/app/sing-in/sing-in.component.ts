import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormSingIn, SingInService} from '../services/sing-in.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

function passControl(control: AbstractControl) {
  const passwordErrors: {
    hasntCapitalLetter?: any,
    hasntSmallLetter?: any,
    hasntNumeral?: any,
    hasntMinLength?: any,
  } = {};
  const hasCapitalLetter = /^(?=.*?[A-Z])/.test(control.value);
  const hasSmallLetter = /(?=.*?[a-z])/.test(control.value);
  const hasNumeral = /(?=.*?[0-9])/.test(control.value);
  const hasMinLength = /.{6,}$/.test(control.value);
  if (!hasCapitalLetter) {
    passwordErrors.hasntCapitalLetter = 'error1';
  }
  if (!hasSmallLetter) {
    passwordErrors.hasntSmallLetter = 'error2';
  }
  if (!hasNumeral) {
    passwordErrors.hasntNumeral = 'error3';
  }
  if (!hasMinLength) {
    passwordErrors.hasntMinLength = 'error4';
  }
  return passwordErrors;
}

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  constructor(private singInService: SingInService) { }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    passControl,
  ]);
  matcher = new MyErrorStateMatcher();
  hide = true;
  telephone = false;
  email = false;
  address = false;
  userEmail: string;
  userLastName;
  userFirstName;
  userMiddleName;
  userRole;
  userTelephone;
  userPostOffice;
  userLogin;
  userPassword;
  fileSize;
  file;
  checkImgUpload = true;

  ngOnInit(): void {
  }


public submitForm() {
 const formSing: FormSingIn = {
   email: this.userEmail,
   lastName: this.userLastName,
   firstName: this.userFirstName,
   middleName: this.userMiddleName,
   userRole:    this.userRole,
   notificationMethod:
     {
       telephone:  this.telephone ? this.userTelephone : null,
       email: this.email ? this.userEmail : null,
       postOffice: this.address ? this.userPostOffice : null,
   },
   login: this.userLogin,
   password: this.userPassword
 };
 this.singInService.sendSingIn(formSing).subscribe();
}
 public fileIpload($event) {
   const file = $event.target.files[0];
   this.file = file;
   if (file) {
     if (file.size > 2097152) {
       this.fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
       this.checkImgUpload = false;
     } else {
       this.fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
       this.checkImgUpload = true;
     }

   }
 }
}
