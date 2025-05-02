import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IpLocationResponse } from '../models/ipLocation.model';

@Injectable({
  providedIn: 'root'
})
export class IpstackService {
  private readonly apiKey = '35498b9be5600a0bf14b64cc3d4e8145';
  private readonly baseUrl = 'http://api.ipstack.com/';

  constructor(private http: HttpClient) { }

  getIpLocation(ipAddress: string): Observable<IpLocationResponse> {
    // Usando la URL exacta con tu API key
    const apiUrl = `${this.baseUrl}${ipAddress}?access_key=${this.apiKey}`;
    console.log('Consultando API en:', apiUrl); // Para verificación
    return this.http.get<IpLocationResponse>(apiUrl);
  }
}
