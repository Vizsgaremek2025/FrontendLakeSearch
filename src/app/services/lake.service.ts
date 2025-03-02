import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { Lake } from '../models/lake.model';

@Injectable({
  providedIn: 'root'
})
export class LakeService {

  private lakesUrl: string;



  constructor(private http: HttpClient, private configService: ConfigService) {
    this.lakesUrl = `${this.configService.tavakUrl}/tavak`;


  }

  getLakes(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.lakesUrl);
  }



}

export interface ApiResponse {
  success: boolean;
  count: number;
  data: Lake;
}

