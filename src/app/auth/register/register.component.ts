import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'
  ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({ 
      name: ['', [Validators.required, Validators.minLength(3)]], 
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required]], 
      password2: ['', [Validators.required]], 
      terms: [true, [Validators.required]],     
  }, {
    Validators: this.passwordsEquals('password', 'password2')
  }); 
  constructor(private fb: FormBuilder, 
              private usuarioService: UsuarioService){ 

  }


  createUser(){ 
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return; 
    }

    // revisar la creacion 
    this.usuarioService.createUser(this.registerForm.value)
        .subscribe(resp => {
            
        }, (error) => {
          //manejar un error
          Swal.fire('Error',error.error.msg, 'error' );
          
        }); 
    
  }


  fieldNoValid(field: string): boolean {
    if(this.registerForm.get(field)?.invalid && this.formSubmitted){ 
      return true; 
    }else{ 
      return false; 
    }
  }

  passwordIsNoValid(){
    const pass1 = this.registerForm.get('password')!.value; 
    const pass2 = this.registerForm.get('password2')!.value; 
    if((pass1 !== pass2) && this.formSubmitted){ 
      return true; 
    }else{ 
      return false;
    }
  }

  acceptTerms(){ 
   return !this.registerForm.get('terms')!.value && this.formSubmitted;
  }

  passwordsEquals(pass1: string, pass2: string) { 

    return (formGroup: FormGroup) => { 
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
      
      if(pass1Control?.value ===pass2Control?.value){ 
        pass2Control?.setErrors(null)
      }else{ 
        pass2Control?.setErrors({noIsEquals: true})
      }
    }

  }

}
