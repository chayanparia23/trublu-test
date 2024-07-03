import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subscription, catchError, map, take } from 'rxjs';
import { User } from '../../models/user.model';
import { UsersApiService } from '../api-services/users-api.service';
import { UpdateUserDto } from '../../models/user-update-dto.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersSubject$: BehaviorSubject<User[]> = new BehaviorSubject([] as User[]);
  public readonly users$: Observable<User[]> = this.usersSubject$.asObservable();

  constructor(private usersApiService: UsersApiService, private toastrService: ToastrService){}

  getUsers = (): Subscription => {
    this.usersSubject$.next([]);

    return this.usersApiService.getUsers()
      .pipe(
        take(1),
        catchError(() => {
          return EMPTY;
        }),
      )
      .subscribe((users: User[]) => {
        this.usersSubject$.next(users);
    });
  }

  checkAndGetUsers = (): Subscription => {
    const usersData = this.usersSubject$.value;
    if(usersData.length === 0) {
        return this.getUsers();
    }
    return null;
  }

  updateUser = (id: string, updatedUserData: UpdateUserDto) => {
    const currentUsers = this.usersSubject$.value;
    const selectedUserDetails = currentUsers.find(user => user.id === id);
    if(selectedUserDetails) {
        selectedUserDetails.name = updatedUserData.name;
        selectedUserDetails.phone = updatedUserData.phone;
        selectedUserDetails.email = updatedUserData.email;
        selectedUserDetails.age = updatedUserData.age;

        this.usersSubject$.next(currentUsers);

        this.toastrService.success("Record updated successfully");
    }
  }

  updatePassword = (id: string, password: string) => {
    const currentUsers = this.usersSubject$.value;
    const selectedUserDetails = currentUsers.find(user => user.id === id);
    if(selectedUserDetails) {
        selectedUserDetails.password = password;

        this.usersSubject$.next(currentUsers);

        this.toastrService.success("Password updated successfully");
    }
  }

  deleteUser = (id: string) => {
    const currentUsers = this.usersSubject$.value;
    const updatedUsers = currentUsers.filter(users => users.id !== id);
    this.usersSubject$.next(updatedUsers);

    this.toastrService.success("Record deleted successfully");
  }
}
