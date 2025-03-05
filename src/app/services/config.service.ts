import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl = 'http://localhost:3000/auth';
  tavakUrl = 'http://localhost:3000';
  fishUrl = 'http://localhost:3000/typicalFish';

  constructor() { }
}
