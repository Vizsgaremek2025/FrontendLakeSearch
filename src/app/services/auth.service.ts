import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserModel } from '../models/UserModel';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUserSubject = new BehaviorSubject<UserModel | null>(this.getLoggedInUser());
  loggedinUser = this.loggedInUserSubject.asObservable();

  constructor(private configService: ConfigService, private http: HttpClient) { }

  login(model: { email: string, password: string }): Observable<boolean> {
    return this.http.post<{ user: UserModel, token: string }>(`${this.configService.apiUrl}/login`, model).pipe(
      map(response => {
        const user = response.user;
        user.token = response.token;
        localStorage.setItem('user', JSON.stringify(user));
        this.loggedInUserSubject.next(user);
        return true;
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.configService.apiUrl}/register`, user);
  }

  updateUser(details: { name: string; email: string }): Observable<any> {
    const user = this.getLoggedInUser();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${user?.token}`
    });

    return this.http.put<any>(`${this.configService.apiUrl}/updatedetails`, details, { headers });
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedInUserSubject.next(null);
  }

  getLoggedInUser(): UserModel | null {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }
}
