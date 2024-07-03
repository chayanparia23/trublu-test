import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { UsersService } from 'src/app/modules/shared/services/data-services/users.service';
import { addSubscriptionsToSubscription } from 'src/app/modules/shared/utils/addToSubscriptionArray.utils';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent {

  @ViewChild("changePasswordForm", {static: false}) changePasswordForm: NgForm;
  @Input() userId: string;
  private selectedUserCurrentPassword$ = this.usersService.users$.pipe(map(users => users.find(x => x.id === this.userId)?.password));
  subscriptions = new Subscription();
  currentPassword: string;
  retypedCurrentPassword: string;
  newPassword: string;
  confirmPassword: string;

  showValidationMessages$ = new BehaviorSubject<boolean>(false);
  showCurrentPasswordNotMatch$ = new BehaviorSubject<boolean>(true);

  password = {
    currentPass: '',
    showCurrentPass: false,
    newPass: '',
    showNewPass: false,
    confirmPass: '',
    showConfirmPass: false,
  };

  constructor(private usersService: UsersService,
    public changePasswordModalRef: BsModalRef) { }

  ngOnInit(): void {
    addSubscriptionsToSubscription(this.subscriptions, [
      this.selectedUserCurrentPassword$.subscribe(currentPassword => {
        this.currentPassword = currentPassword;
      })
    ]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onChangePassword() {
    this.showValidationMessages$.next(this.changePasswordForm.invalid);

    if(this.changePasswordForm.valid) {
      this.showCurrentPasswordNotMatch$.next(this.password.currentPass === this.currentPassword);

      if (this.password.currentPass === this.currentPassword && this.password.newPass === this.password.confirmPass) {
        this.usersService.updatePassword(this.userId, this.password.newPass);
        this.changePasswordModalRef.hide();
      }
    }
  }
}
