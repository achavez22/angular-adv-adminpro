import { Component } from '@angular/core';
import { User } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public  user: User;
  constructor( private usuarioService: UsuarioService ) { 
    this.user = usuarioService.user; 
    
  }

  logout() {
    this.usuarioService.logout();
  }
}
