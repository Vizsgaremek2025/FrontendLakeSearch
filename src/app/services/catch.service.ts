import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { CatchResponse } from '../models/catches.model';

@Injectable({
  providedIn: 'root'
})
export class CatchService {

  private catchesUrl: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.catchesUrl = `${this.configService.tavakUrl}/catch`;
  }

  getFishByLakeId(lakeId: string | null): Observable<CatchResponse> {
    return this.http.get<CatchResponse>(`${this.catchesUrl}?lakeId=${lakeId}`);
  }
}
