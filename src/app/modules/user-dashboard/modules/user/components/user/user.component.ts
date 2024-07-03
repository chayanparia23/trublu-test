import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription, combineLatest, map } from 'rxjs';
import { UsersService } from 'src/app/modules/shared/services/data-services/users.service';
import { addSubscriptionsToSubscription } from 'src/app/modules/shared/utils/addToSubscriptionArray.utils';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';
import { ForgotPasswordModalComponent } from './forgot-password-modal/forgot-password-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  selectedUser$ = combineLatest([
    this.route.params,
    this.usersService.users$
  ]).pipe(map(([params, users]) => users.find(user => user.id === params['userId'])))
  
  subscriptions = new Subscription();
  selectedUserId = '';

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private usersService: UsersService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    addSubscriptionsToSubscription(this.subscriptions, [
      this.usersService.checkAndGetUsers(),
      this.route.params.subscribe(params => this.selectedUserId = params['userId'])
    ]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  backToUsers() {
    this.router.navigateByUrl('users');
  }

  openEditUserModal() {
    const config = {
      class: "modal-dialog-centered modal-lg",
      initialState: {
        userId: this.selectedUserId
      },
      animated: true
    }
    this.modalService.show(EditModalComponent, config);
  }

  openChangePasswordModal() {
    const config = {
      class: "modal-dialog-centered modal-md",
      initialState: {
        userId: this.selectedUserId
      },
      animated: true
    }
    this.modalService.show(ChangePasswordModalComponent, config);
  }

  openResetPasswordModal() {
    const config = {
      class: "modal-dialog-centered modal-md",
      initialState: {
        userId: this.selectedUserId
      },
      animated: true
    }
    this.modalService.show(ForgotPasswordModalComponent, config);
  }
}
