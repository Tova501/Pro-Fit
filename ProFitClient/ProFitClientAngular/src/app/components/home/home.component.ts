import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  usersCount: number = 0;
  activeUsers: number = 0;
  loading = false;

  constructor(private userService: UserService) { 
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe(
      (data: any[]) => {
        this.userService.updateUserCounts(data);
        this.fetchUserCounts();
        this.loading = false;
      })
  }

  fetchUserCounts() {
    this.userService.totalUsers$.subscribe(count => this.usersCount = count);
    this.userService.activeUsers$.subscribe(count => this.activeUsers = count);
  }

  navigateToUsers() {
    // כאן יפנה לדף ניהול המשתמשים
  }

  navigateToStats() {
    // כאן יפנה לדף הסטטיסטיקות
  }
}
