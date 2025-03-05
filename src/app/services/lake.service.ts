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
  private fishUrl:string;


  constructor(private http: HttpClient, private configService: ConfigService) {
    this.lakesUrl = `${this.configService.tavakUrl}/tavak`;
    this.fishUrl=`${this.configService.fishUrl}`;

  }

  getLakes(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.lakesUrl);
  }

  getLakeById(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.lakesUrl}/${id}`);
  }

  getFishList(): Observable<any[]> {
    return this.http.get<any[]>(this.fishUrl);
  }



}

export interface ApiResponse {
  success: boolean;
  count: number;
  data: Lake;
}

