import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/usuario.model';
import { SidebarServiceService } from 'src/app/services/sidebar-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  munuItems: any[]= [];
  public  user: User;
  constructor(public sideBarService: SidebarServiceService, 
              private usuarioService :UsuarioService){
    this.user = usuarioService.user; 
  }
  ngOnInit(): void {
    this.sideBarService.loadMenu(); 
    
  }
}
