import { Injectable } from '@angular/core';
import type { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';


@Injectable({
  providedIn: 'root',
})

export class AdminGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // return (this.usuarioService.role === 'ADMIN_ROLE') ? true : false;
    if (this.usuarioService.role === 'ADMIN_ROLE') {
      return true;
    } else {
      this.router.navigateByUrl('/dashboard');
      return false;

    }
  }

};
