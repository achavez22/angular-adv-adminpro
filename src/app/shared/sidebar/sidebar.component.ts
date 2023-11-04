import { Component } from '@angular/core';
import { User } from 'src/app/models/usuario.model';
import { SidebarServiceService } from 'src/app/services/sidebar-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  munuItems: any[]= [];
  public  user: User;
  constructor(private sideBarService: SidebarServiceService, 
              private usuarioService :UsuarioService){
    this.munuItems = sideBarService.menu;
    this.user = usuarioService.user; 
  }
}
