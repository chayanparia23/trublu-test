import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { EditModalComponent } from './components/user/edit-modal/edit-modal.component';
import { ForgotPasswordModalComponent } from './components/user/forgot-password-modal/forgot-password-modal.component';
import { ChangePasswordModalComponent } from './components/user/change-password-modal/change-password-modal.component';

@NgModule({
  declarations: [
    UserComponent,
    UsersComponent,
    EditModalComponent,
    ForgotPasswordModalComponent,
    ChangePasswordModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule {}
