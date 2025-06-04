import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  loading: boolean = true;
  searchTerm: string = '';
  emailSearchTerm: string = '';
  statusFilter: string = 'all';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: any[]) => {
        this.users = data;
        this.applyFilters(); // החל סינון לאחר טעינת הנתונים
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
        this.loading = false;
      }
    );
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesStatus =
        this.statusFilter === 'all' ||
        (this.statusFilter === 'active' && user.isActive) ||
        (this.statusFilter === 'inactive' && !user.isActive);

      const matchesNameSearch =
        !this.searchTerm ||
        user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesEmailSearch =
        !this.emailSearchTerm ||
        user.email.toLowerCase().includes(this.emailSearchTerm.toLowerCase());

      return matchesStatus && matchesNameSearch && matchesEmailSearch;
    });
  }

  filterUsers(): void {
    this.applyFilters();
  }

  deactivateUser(userId: number): void {
    this.userService.deactivateUser(userId).subscribe(
      () => {
        console.log('User deactivated successfully');
        this.fetchUsers(); // רענן את רשימת המשתמשים
      },
      (error) => {
        console.error('Error deactivating user:', error);
      }
    );
  }

  reactivateUser(userId: number): void {
    this.userService.reactivateUser(userId).subscribe(
      () => {
        console.log('User reactivated successfully');
        this.fetchUsers(); // רענן את רשימת המשתמשים
      },
      (error) => {
        console.error('Error reactivating user:', error);
      }
    );
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          console.log('User deleted successfully');
          this.fetchUsers();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  trackByUserId(index: number, user: any): number {
    return user.id; // מעקב לפי מזהה המשתמש
  }
}
