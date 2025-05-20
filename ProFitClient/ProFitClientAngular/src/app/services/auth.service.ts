import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  // Register a new user
  register(username: string, email: string, password: string): boolean {

    const newUser: User = {
      id: Date.now(), // דוגמה ל-ID ייחודי
      firstName,
      email,
    };
    this.currentUserSubject.next(newUser);
    return true; // רישום הצליח
  }

  // Login an existing user
  login(username: string, password: string): boolean {
    // כאן תוכל להוסיף לוגיקה לבדוק את פרטי ההתחברות מול השרת
    // נניח שההתחברות הצליחה
    const loggedInUser: User = {
      id: 1, // דוגמה ל-ID ייחודי
      name: "",
      email: 'example@example.com',
      password: "",
      role: "admin" // דוגמה לאימייל
    };
    this.currentUserSubject.next(loggedInUser);
    return true; // התחברות הצליחה
  }

  // Logout the current user
  logout(): void {
    this.currentUserSubject.next(null); // מניחים שהמשתמש התנתק
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
