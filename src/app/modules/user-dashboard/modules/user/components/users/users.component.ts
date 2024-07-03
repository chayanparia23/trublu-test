import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, combineLatest, debounceTime, fromEvent, map } from 'rxjs';
import { Role } from 'src/app/modules/shared/enums/role.enum';
import { UsersService } from 'src/app/modules/shared/services/data-services/users.service';
import { ConfirmService } from 'src/app/modules/shared/services/util-services/confirm.service';
import { addSubscriptionsToSubscription } from 'src/app/modules/shared/utils/addToSubscriptionArray.utils';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  selectedRoleFilter$ = new BehaviorSubject<string>(null);
  users$ = combineLatest([
    this.usersService.users$,
    this.selectedRoleFilter$
  ]).pipe(map(([users, selectedRole]) => {
    
    if(selectedRole) {
      return users.filter(user => user.role === selectedRole);
    }
    
    return users;
  }));

  roles = this.enumToKeyValueArray(Role);

  
  subscriptions = new Subscription();

  constructor(private usersService: UsersService, private router: Router, private confirmService: ConfirmService) {}

  ngOnInit(): void {
    addSubscriptionsToSubscription(this.subscriptions, [
      this.usersService.checkAndGetUsers()
    ])
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  removeUser(userId: string, name: string) {
    this.confirmService.confirm("Confirm delete user " + name, "This cannot be undone").subscribe(result => {
      if(result){
        this.usersService.deleteUser(userId);
      }
    })
    
  }

  enumToKeyValueArray(enumObj: any): { key: string; value: any }[] {
    return Object.keys(enumObj).map(key => ({
      key: key,
      value: enumObj[key]
    }));
  }

  setRoleFilter(role: string) {
    this.selectedRoleFilter$.next(role);
  }

  viewUser(userId: string) {
    this.router.navigateByUrl('users/' + userId);
  }
}
