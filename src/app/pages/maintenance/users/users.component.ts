import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { User } from 'src/app/models/usuario.model';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy{

  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];

  private imgSubs: Subscription;

  public from: number = 0;
  public isLoading: boolean = true;

  constructor(private usuarioService: UsuarioService,
    private searchService: SearchsService,
    private modalImageService: ModalImageService) {

  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  ngOnInit(): void {
    this.loadUsers();

    this.imgSubs = this.modalImageService.newImage
    .pipe(delay(100))
    .subscribe(img => this.loadUsers());
  }

  loadUsers() {
    this.isLoading = true;
    this.usuarioService.loadUsers(this.from)
      .subscribe(({ total, usuarios }) => {
        this.totalUsers = total;
        if (usuarios.length !== 0) {
          this.users = usuarios;
          this.usersTemp = usuarios;

          this.isLoading = false
        }

      });
  }

  changePage(value: number) {
    this.from += value;
    if (this.from < 0) {
      this.from = 0;
    } else if (this.from > this.totalUsers) {
      this.from -= value;
    }

    this.loadUsers();
  }


  search(term: string) {
    if (term.length === 0) {
      return this.users = this.usersTemp;
    }
    this.searchService.search('usuarios', term)
      .subscribe(resp => this.users = resp as User[]);
  }


  changeRole(user: User) {
    console.log(user);
    this.usuarioService.saveUser(user)
      .subscribe(resp => console.log(resp));
  }



  deleteUser(user: User) {
    if (user.uid === this.usuarioService.uid) {
      return Swal.fire('Advertencia', 'No puedes eliminarte a ti mismo', 'warning');
    }


    Swal.fire({
      title: 'Eliminar usuario?',
      text: `Esta a punto de eliminar a ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminart!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUser(user)
          .subscribe(resp => {

            this.loadUsers();
            Swal.fire(
              'Eliminado!',
              `${user.name} fue eliminado.`,
              'success'
            )
          });
        // 
      }
    })
  }

openModal(user : User){ 
  this.modalImageService.openModal('usuarios', user.uid, user.img);
}

}
