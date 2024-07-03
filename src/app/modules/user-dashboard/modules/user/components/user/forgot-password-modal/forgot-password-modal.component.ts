import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from 'src/app/modules/shared/services/data-services/users.service';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss']
})
export class ForgotPasswordModalComponent {
  @ViewChild("resetPasswordForm", {static: false}) resetPasswordForm: NgForm;
  @Input() userId: string;

  newPassword: string;
  confirmPassword: string;

  showValidationMessages$ = new BehaviorSubject<boolean>(false);
  showCurrentPasswordNotMatch$ = new BehaviorSubject<boolean>(true);

  password = {
    newPass: '',
    showNewPass: false,
    confirmPass: '',
    showConfirmPass: false,
  };

  constructor(private usersService: UsersService,
    public resetPasswordModalRef: BsModalRef) { }


  onChangePassword() {
    this.showValidationMessages$.next(this.resetPasswordForm.invalid);

    if(this.resetPasswordForm.valid && this.password.newPass === this.password.confirmPass) {
      this.usersService.updatePassword(this.userId, this.password.newPass);
      this.resetPasswordModalRef.hide();
    }
  }
}
