import {ValidatorFn, AbstractControl} from '@angular/forms';


export class Validations {

  constructor() {

  }

  static MatchValidator(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {

      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      // console.log("passwordMatch", passwordControl, confirmPasswordControl)

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      // console.log("passwordMatch passwordControl.value", passwordControl.value)
      // console.log("passwordMatch confirmPasswordControl.value", confirmPasswordControl.value)

      const err = confirmPasswordControl.getRawValue()

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({passwordMismatch: true});
        return {passwordMismatch: true};

      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }

      // if (confirmPasswordControl.errors && !err.passwordMismatch) {
      //   console.log("passwordMatch 0 confirmPasswordControl.errors", confirmPasswordControl.errors)
      //   console.log("passwordMatch 0 err.passwordMismatch", err.passwordMismatch)
      //   return null;
      // }
    };
  }
}
