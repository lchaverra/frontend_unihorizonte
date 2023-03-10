import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { UserSignUpData } from '../../../core/user/user.types';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit {
  alert: { type: FuseAlertType; message: string; } = { type: 'success', message: '' };

  showAlert: boolean = false;

  signUpForm: FormGroup;

  constructor(private _authService: AuthService, private _formBuilder: FormBuilder, private _router: Router) { }

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signUpForm = this._formBuilder.group({
      personId: ['1010038910', [Validators.required, Validators.maxLength(20), Validators.pattern('[0-9]+')]],
      name: ['Laurent', Validators.required],
      surname: ['Chaverra', Validators.required],
      email: ['ldmckkb@gmail.com', [Validators.required, Validators.email]],
      phone: ['3142454336', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]],
      password: ['123123', Validators.required],
      agreements: ['', Validators.requiredTrue]
    });
  }

  /**
   * Sign up
   */
  signUp(): void {
    // Do nothing if the form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    // Disable the form
    this.signUpForm.disable();

    // Hide the alert
    this.showAlert = false;

    // retrieve form data
    const { personId, name, surname, email, password, phone } = this.signUpForm.value;
    const userSignUpData: UserSignUpData = { personId, name, surname, email, password, phone };

    //
    this._authService
      .signUp(userSignUpData)
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.status === 201) {
            this._router.navigateByUrl('/confirmation-required');
          }
          else {
            // Re-enable the form
            this.signUpForm.enable();

            // Reset the form
            this.signUpForm.reset();

            // Set the alert
            this.alert = {
              type: 'error',
              message: response.errorMessage
            };

            // Show the alert
            this.showAlert = true;
          }
        }
      });
  }
}
