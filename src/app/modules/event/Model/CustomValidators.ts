import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export class CustomValidators {
static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      // if control is empty return no error
      return null;	
    }

    // test the value of the control against the regexp supplied
    const valid = regex.test(control.value);

    // if true, return no error (no error), else return error passed in the second parameter
    return valid ? null : error;
  };
}

static passwordMatchValidator(control: AbstractControl) {
  const password: string = control.get('password').value; // get password from our password form control
  const confirmPassword: string = control.get('confirmpassword').value; // get password from our confirmPassword form control
  // compare is the password math
  if (password !== confirmPassword) {
    // if they don't match, set an error in our confirmPassword form control
    control.get('confirmpassword').setErrors({ NoPassswordMatch: true });
  }
}

static dateMatchValidator(control: AbstractControl) {
  const date = new Date(control.get('birthday').value); // get password from our password form control
  const today = new Date(); // get password from our confirmPassword form control
  // compare is the password math
	
  if (date > today) {
    // if they don't match, set an error in our confirmPassword form control
    control.get('birthday').setErrors({ ErrorDateMatch: true });
  }
}
	 
static passwordMatchValidatorEdit(control: AbstractControl) {
		const password: string = control.get('password').value; // get password from our password form control
		const confirmPassword: string = control.get('confirmpassword').value; // get password from our confirmPassword form control
		// compare is the password math
	if (password != null || password != undefined || password != "") {		
		if (password !== confirmPassword) { 
			control.get('confirmpassword').setErrors({ NoPassswordMatchEdit: true });
		}
			
	}
			
	}
	static dateMatchQuotaValidator(control: AbstractControl) {
		const dIssuance = new Date(control.get('dateissuance').value); 
		const dExpiration = new Date(control.get('dateexpiration').value); 		

		if (dIssuance > dExpiration) {
			
			control.get('dateissuance').setErrors({ ErrorDateMatchQouta: true });
			console.log(control.get('dateissuance'));
			
		}
		else if (dExpiration < dIssuance) {
			control.get('dateexpiration').setErrors({ ErrorDateMatchQouta: true });
			console.log(control.get('dateexpiration'));
		}
		
		else { 
			if (control.get('dateissuance').errors != null || control.get('dateexpiration').errors != null) { 
				if (control.get('dateissuance').hasError('ErrorDateMatchQouta') || control.get('dateexpiration').hasError('ErrorDateMatchQouta')) { 
					if (control.get('dateissuance').errors.ErrorDateMatchQouta) {
						control.get('dateissuance').setErrors({ ErrorDateMatchQouta: null });
						control.get('dateissuance').updateValueAndValidity();
					} else { 
						control.get('dateexpiration').setErrors({ ErrorDateMatchQouta: null });
						control.get('dateexpiration').updateValueAndValidity();
					}					
						
				}
			}
				
		}		

	}		
}
