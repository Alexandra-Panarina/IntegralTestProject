import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';



export interface FormSingIn {
  email: string;
  lastName: string;
  firstName: string;
  middleName: string;
  userRole: string;
  notificationMethod: FormNotificationMethod;
  login: string;
  password: string;
}

export interface FormNotificationMethod {
  telephone: any;
  email: string;
  postOffice: any;
}

@Injectable({
  providedIn: 'root'
})

export class SingInService {
  constructor(private http: HttpClient) { }

   sendSingIn(user: FormSingIn ): Observable<FormSingIn> {
    return this.http.post<FormSingIn>('#', user)
      .pipe();
  }
}
