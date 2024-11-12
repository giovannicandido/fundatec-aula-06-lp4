import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { User } from './model/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'aula-06';
  users: Observable<User[]> = of([])
  usersArray: User[] = []
  user: User = {
    id: 1,
    name: "Name",
    email: "email9090909@email.com",
    gender: "male",
    status: "active"
  }

  subscription!: Subscription
  
  constructor(private userService: UserService) {}
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  create() {
    this.userService.create(this.user)
  }
  
  ngOnInit(): void {
    this.users = this.userService.list()
    this.subscription = this.userService.list().subscribe(users => {
      this.usersArray = users
    })
  }




}
