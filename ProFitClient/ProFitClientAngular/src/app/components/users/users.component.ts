// filepath: c:\Users\user1\Desktop\ProFit\ProFitClient\ProFitClientAngular\src\app\components\users\users.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GraphService } from '../../services/graph.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading: boolean = true;
  userGrowthData: any[] = [];
  activeStatusData: any[] = [];
  cvUploadData: any[] = [];

  constructor(private userService: UserService, private graphService: GraphService) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchGraphData();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.loading = false;
      }
    );
  }

  fetchGraphData(): void {
    this.graphService.getUserGrowth().subscribe(
      (data) => {
        this.userGrowthData = data;
      },
      (error) => {
        console.error('Error fetching user growth data:', error);
      }
    );

    this.graphService.getActiveStatus().subscribe(
      (data) => {
        this.activeStatusData = data;
      },
      (error) => {
        console.error('Error fetching active status data:', error);
      }
    );

    this.graphService.getCvUploadData().subscribe(
      (data) => {
        this.cvUploadData = data;
      },
      (error) => {
        console.error('Error fetching CV upload data:', error);
      }
    );
  }
}