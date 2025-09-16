import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private apiUrl = "https://localhost:7131/api/Graphs";

  constructor(private http: HttpClient) { }

  getUserGrowth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-growth`);
  }

  getActiveStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/active-status`);
  }

  getCvUploadStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cv-uploads`);
  }
}