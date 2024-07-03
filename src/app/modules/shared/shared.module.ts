import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

//NGX Bootstrap Imports
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { FormRowComponent } from './components/form-row/form-row.component';
import { ValidationTooltipComponent } from './components/validation-tooltip/validation-tooltip.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

const components = [
  FormRowComponent,
  ValidationTooltipComponent,
  ConfirmDialogComponent
];

@NgModule({
  declarations: [ 
    components
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    FontAwesomeModule,
    ToastrModule.forRoot({
        positionClass: 'toast-bottom-right'
    })
  ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BsDropdownModule,
    TabsModule,
    PaginationModule,
    ButtonsModule,
    ModalModule,
    FontAwesomeModule,
    ToastrModule,
    components
  ],
})
export class SharedModule {}
