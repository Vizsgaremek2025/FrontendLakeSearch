import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountyService {

  private countyUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.countyUrl = `${this.configService.tavakUrl}/county`;
  }

  getCounties(): Observable<any> {
    return this.http.get<any>(this.countyUrl);
  }
}
