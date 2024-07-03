import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/modules/shared/services/data-services/users.service';
import { ConfirmService } from 'src/app/modules/shared/services/util-services/confirm.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$ = this.usersService.users$;

  constructor(private usersService: UsersService, private router: Router, private confirmService: ConfirmService) {}

  ngOnInit(): void {
    this.usersService.checkAndGetUsers();
  }

  removeUser(userId: string, name: string) {
    this.confirmService.confirm("Confirm delete user " + name, "This cannot be undone").subscribe(result => {
      if(result){
        this.usersService.deleteUser(userId);
      }
    })
    
  }

  viewUser(userId: string) {
    this.router.navigateByUrl('users/' + userId);
  }
}
