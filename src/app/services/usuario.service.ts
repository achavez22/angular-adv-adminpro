import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../models/usuario.model';
import { LoadUsers } from '../interfaces/load-users.interface';



const base_url = environment.base_url;
declare const google: any;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public auth2: any;
  public user!: User;
  
  constructor(private http: HttpClient, 
              private router: Router, 
              private ngZone: NgZone) { 

this.googleInit();

}

get token(): string{
  return localStorage.getItem('token') || '';
}

get uid(): string{
  return this.user.uid ||'';
}

get role(): 'ADMIN_ROLE' | 'USER_ROLE'{
  return this.user.role; 
}

get headers() {
  return {headers: {
    'x-token': this.token
  }
}
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

  saveLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    const email = localStorage.getItem('email')|| '';
    this.router.navigateByUrl('/login');
    // google.accounts.id.revoke(email, () => {
    //   this.ngZone.run(() => {
    //          this.router.navigateByUrl('/login');
    //   })
    // })    

  }


  validarToken(): Observable<boolean> {
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        const { email, google, name, role, img= '', uid } = resp.usuario
        this.user = new User(name, email, '', img, google, role, uid);
        this.saveLocalStorage(resp.token, resp.menu);
      
        return true;
      }),
      // map( resp => true),
      catchError( error => of(false) )
    );

  }

  createUser(formData: RegisterForm){
   return this.http.post(`${base_url}/users`, formData)
   .pipe(
    tap( (resp: any) => {
      this.saveLocalStorage(resp.token,resp.menu);
    })
  ); ; 

  }

  updateProfile(data: {email:string,  name:string, role: string}){
   data = { 
    ...data,
    role: this.user.role!,
   }
    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers)
  }

  loginUser(formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      tap( (resp: any) => {
        this.saveLocalStorage(resp.token, resp.menu);
        
      })
    ); 
   }


   loginGoogle(token: string){
      return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap( (resp: any) => {
          this.saveLocalStorage(resp.token, resp.menu);
          localStorage.setItem('email',resp.email)
        })
      );
   }


   loadUsers(from:  number= 0){ 
      const url = `${base_url}/users?desde=${from}`;

      return this.http.get<LoadUsers>(url, this.headers)
          .pipe(
            map(resp =>{              
              const usuarios = resp.usuarios.map(
                user => new User(user.name, user.email, '', user.img,user.role, user.google,user.uid))
              return {
                total: resp.total,
                usuarios
              };
            })
          )
    }

    deleteUser(user:  User){ 
      const url = `${base_url}/users/${user.uid}`;
      return this.http.delete(url, this.headers); 
    }

    saveUser(user: User){
   
      return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers)
    }

}
