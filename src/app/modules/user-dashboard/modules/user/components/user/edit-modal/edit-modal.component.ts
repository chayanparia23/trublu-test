import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Observable, Subscription, map, startWith } from 'rxjs';
import { UpdateUserDto } from 'src/app/modules/shared/models/user-update-dto.model';
import { User } from 'src/app/modules/shared/models/user.model';
import { UsersService } from 'src/app/modules/shared/services/data-services/users.service';
import { addSubscriptionsToSubscription } from 'src/app/modules/shared/utils/addToSubscriptionArray.utils';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  @Input() userId: string;
  selectedUser$ = this.usersService.users$.pipe(map(users => users.find(x => x.id === this.userId)));
  subscriptions = new Subscription();
  selectedUser: User = null;

  editProfileForm = this.createEditProfileForm();

  nameValidationMessages$: Observable<string[]>;
  emailValidationMessages$: Observable<string[]>;
  ageValidationMessages$: Observable<string[]>;
  phoneValidationMessages$: Observable<string[]>;

  showValidationErrors$ = new BehaviorSubject<boolean>(false);
  
  private readonly nameValidationConfig = [
    {
      validator: 'required',
      message: () => 'Please enter a valid name',
    }
  ];

  private readonly ageValidationConfig = [
    {
      validator: 'required',
      message: () => 'Please enter a valid age'
    },
    {
      validator: 'max',
      message: () => 'Age can not go beyond 50'
    },
    {
      validator: 'min',
      message: () => 'Age should be above 10'
    },
  ];

  private readonly phoneValidationConfig = [
    {
      validator: 'required',
      message: () => 'Please enter a valid phone number'
    },
    {
      validator: 'maxlength',
      message: () => 'Phone number can not be beyond 10'
    },
    {
      validator: 'minlength',
      message: () => 'Phone number should be of 10 digits'
    }
  ];

  private readonly emailValidationConfig = [
    {
      validator: 'required',
      message: () => 'Please enter a valid phone number'
    },
    {
      validator: 'email',
      message: () => 'Please enter a valid email address'
    }
  ];

  get nameControl() {
    return this.editProfileForm.get('name');
  }
  get ageControl() {
    return this.editProfileForm.get('age');
  }
  get phoneControl() {
    return this.editProfileForm.get('phone');
  }
  get emailControl() {
    return this.editProfileForm.get('email');
  }

  constructor(private usersService: UsersService,
    public editProfileModalRef: BsModalRef,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setValidationErrorMessages();
    addSubscriptionsToSubscription(this.subscriptions, [
      this.selectedUser$.subscribe(user => {
        this.selectedUser = user;
        this.nameControl.patchValue(user.name);
        this.ageControl.patchValue(user.age);
        this.phoneControl.patchValue(user.phone);
        this.emailControl.patchValue(user.email);
      })
    ]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  saveChanges = (): void => {
    this.showValidationErrors$.next(this.editProfileForm.invalid);

    if (this.editProfileForm.invalid) throw "Invalid form";

    if (this.editProfileForm.valid) {
      const updatedData: UpdateUserDto = {
        name: this.nameControl.value,
        age: this.ageControl.value,
        email: this.emailControl.value,
        phone: this.phoneControl.value
      } 
      this.usersService.updateUser(this.userId, updatedData);
      this.editProfileModalRef.hide();
    }
  }


  private createEditProfileForm() {
    return this.formBuilder.group({
      name: ['', [ Validators.required]],
      age: [0, [ Validators.required, Validators.max(50), Validators.min(10)]],
      phone: [0, [ Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email: ['', [ Validators.required, Validators.email]]
    });
  }

  private setValidationErrorMessages(): void {
    this.nameValidationMessages$ = this.errorMessage$('name', this.nameValidationConfig);
    this.ageValidationMessages$ = this.errorMessage$('age', this.ageValidationConfig);
    this.phoneValidationMessages$ = this.errorMessage$('phone', this.phoneValidationConfig);
    this.emailValidationMessages$ = this.errorMessage$('email', this.emailValidationConfig);
  }

  private errorMessage$(
    controlName: string,
    errorConfig: { validator: string; message?: any }[]
  ): Observable<string[]> {
    const ctrl = this.editProfileForm.get(controlName);
    return ctrl.statusChanges.pipe(
        startWith(ctrl.status),
        map(() => {
          const matchingErrors = errorConfig.filter((cfg) => !!ctrl.errors && !!ctrl.errors[cfg.validator]);
          const messages = matchingErrors.map((cfg) => cfg.message ? cfg.message() : (ctrl.errors[cfg.validator] as string));
          return messages;
        })
      );
  }
}
