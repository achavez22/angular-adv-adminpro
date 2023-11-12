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
  public from: number = 0;

  public isLoading: boolean = true;

  constructor(private usuarioServer: UsuarioService){ 

  }
  ngOnInit(): void {
   this.loadUsers();
  }

  loadUsers(){
    this.isLoading = true;
    this.usuarioServer.loadUsers(this.from)
    .subscribe(({total, usuarios}) => { 
      this.totalUsers = total; 
      if(usuarios.length !== 0){
        this.users = usuarios;        
      }
      this.isLoading = false;
    });
  }

  changePage(value: number){
    this.from += value;
    if (this.from < 0) {
      this.from = 0;
    } else if (this.from > this.totalUsers){
      this.from -= value;
    }

    this.loadUsers();
  }
}
