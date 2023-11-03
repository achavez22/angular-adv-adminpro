import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn: ElementRef | undefined;
  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) { }


  ngAfterViewInit(): void {
    // this.renderButton();
  }

  // googleInit() {
  //   google.accounts.id.initialize({
  //     client_id: '1028469231882-dgvfiigp3i0ujqv6u84ur3bh4g1pqdqg.apps.googleusercontent.com',
  //     callback: response => this.handleCredentialResponse(response)
  //   });

    // google.accounts.id.renderButton(
    //   // document.getElementById("buttonDiv"),
    //   this.googleBtn?.nativeElement,
    //   { theme: "outline", size: "large" }  // customization attributes
    // );

  //   google.accounts.id.prompt(); // also display the One Tap dialog
  // }

  // handleCredentialResponse(response: any) {
  //   console.log("Encoded JWT ID token: " + response.credential);
  //   this.usuarioService.loginGoogle(response.credential)
  //     .subscribe(resp => {
  //       this.router.navigateByUrl('/')
  //     });

  // }

  login() {

    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const auxData: any = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
      remember: this.loginForm.controls['remember'].value
    }

    this.usuarioService.loginUser(auxData)
      .subscribe(resp => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', auxData.email);
        } else {
          localStorage.removeItem('email');
        }

         // Navegar al Dashboard
         this.router.navigateByUrl('/');

      }, error => {
        Swal.fire('Error', error.error.msg, 'error');


      })
  }

  // renderButton() {
  //   google.accounts.id.renderButton(
  //     this.googleBtn?.nativeElement,
  //     { theme: "outline", size: "large" }  // customization attributes
  //   );

  //   this.startApp();

  // }

  // async startApp() {
    
  //   await this.usuarioService.googleInit();
  //   this.auth2 = this.usuarioService.auth2;

  //   this.attachSignin( document.getElementById('my-signin2') );
    
  // };

  // attachSignin(element) {
    
  //   this.auth2.attachClickHandler( element, {},
  //       (googleUser) => {
  //           const id_token = googleUser.getAuthResponse().id_token;
  //           // console.log(id_token);
  //           this.usuarioService.loginGoogle( id_token )
  //             .subscribe( resp => {
  //               // Navegar al Dashboard
  //               this.ngZone.run( () => {
  //                 this.router.navigateByUrl('/');
  //               })
  //             });

  //       }, (error) => {
  //           alert(JSON.stringify(error, undefined, 2));
  //       });
  // }


  fieldNoValid(field: string): boolean {
    if (this.loginForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}
