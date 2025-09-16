import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "https://localhost:7131/api/user";

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  getUserGrowth(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/growth`);
  }

  getActiveStatus(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/active-status`);
  }

  getCVUploadStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cv-uploads`);
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${userId}`);
  }

  deactivateUser(userId: number): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${userId}/toggle-status`, {});
  }

  reactivateUser(userId: number): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${userId}/toggle-status`, {});
  }
}