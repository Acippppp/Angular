import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class NationalityService {

  constructor(private http:HttpClient) { }

  getData(name: string)
  {
    let url = `https://api.nationalize.io/?name=${name}`;
    return this.http.get(url);

  }
}
 