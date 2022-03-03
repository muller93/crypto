import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/model/user.interface';

@Injectable()
export class AuthService {
  getLoginData(): Observable<User> {
    return of(JSON.parse(localStorage.getItem('loggedInUser')));
  }

  getUsers(): Observable<User[]> {
    return of(JSON.parse(localStorage.getItem('users')));
  }

  setLoggedInUser(user: User): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
  }

  setUsers(users: string): void {
    localStorage.setItem('users', users);
  }
}
