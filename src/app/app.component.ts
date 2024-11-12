import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, of, Subscription, timeInterval, 
  timer, interval, map, filter, skip, catchError, tap } from 'rxjs';
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

  intervalo = interval(1000)

  constructor(private userService: UserService) { }

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

    this.intervalo
      .pipe(
        map(valor => valor * 2),
        skip(3),
        tap(valor => {
          if(valor === 12) {
            throw new Error('Valor === 12')
          }
        }),
        filter(valor => valor <= 20),
        catchError(error => { 
          console.error(error);
          return of(10) 
        })
      )
      .subscribe((valor) => {
        console.log("Emitindo...")
        console.log(valor)
      })


  }




}
