import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  public totalUsers:  number = 0;
  public users: User[] = [];


  constructor(private usuarioServer: UsuarioService){ 

  }
  ngOnInit(): void {
    this.usuarioServer.loadUsers(0)
    .subscribe(({total, usuarios}) => { 
      this.totalUsers = total; 
      this.users = usuarios;
      
    })
  }
}
