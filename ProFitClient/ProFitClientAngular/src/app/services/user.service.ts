import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "https://localhost:7131/api/user";

  // משתנים לניהול סך המשתמשים והמשתמשים הפעילים
  private totalUsersSubject = new BehaviorSubject<number>(0);
  private activeUsersSubject = new BehaviorSubject<number>(0);

  totalUsers$ = this.totalUsersSubject.asObservable();
  activeUsers$ = this.activeUsersSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  updateUserCounts(users: User[]): void {
    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.isActive).length;

    this.totalUsersSubject.next(totalUsers);
    this.activeUsersSubject.next(activeUsers);
  }

  deactivateUser(userId: number): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${userId}/toggle-status`, {});
  }

  reactivateUser(userId: number): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${userId}/toggle-status`, {});
  }

  getUserStorageUsage(): Observable<{ username: string; email: string; storageUsed: number }[]> {
    return this.http.get<{ username: string; email: string; storageUsed: number }[]>(`${this.apiUrl}/storage-usage`);
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${userId}`);
  }
}