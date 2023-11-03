import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';


const base_url = environment.base_url;
declare const google: any;
 5

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public auth2: any;
  constructor(private http: HttpClient, 
              private router: Router, 
              private ngZone: NgZone) { 

this.googleInit();

}

googleInit() {

  // return new Promise<void>((resolve) => {
  //   gapi.load('auth2', () => {
  //     this.auth2 = google.auth2.init({
  //       client_id: '1028469231882-dgvfiigp3i0ujqv6u84ur3bh4g1pqdqg.apps.googleusercontent.com',
  //       cookiepolicy: 'single_host_origin',
  //     });

  //     resolve();
  //   });
  // })

}


  logout() {
    localStorage.removeItem('token');
    const email = localStorage.getItem('email')|| '';
    this.router.navigateByUrl('/login');
    // google.accounts.id.revoke(email, () => {
    //   this.ngZone.run(() => {
    //          this.router.navigateByUrl('/login');
    //   })
    // })    

  }


  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token );
      }),
      map( resp => true),
      catchError( error => of(false) )
    );

  }

  createUser(formData: RegisterForm){
   return this.http.post(`${base_url}/users`, formData)
   .pipe(
    tap( (resp: any) => {
      localStorage.setItem('token', resp.token)
    })
  ); ; 

  }


  loginUser(formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    ); 
   }


   loginGoogle(token: string){
      return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token)
          localStorage.setItem('email',resp.email)
        })
      );
   }

}
