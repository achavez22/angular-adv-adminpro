import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarServiceService {

  constructor() { }

  public menu :any[] = [];



  loadMenu(){ 
    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];
    console.log(this.menu);
  }

 menu2: any[] = [
    {
      title: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Main',
          url: '/'
        },
        {
          title: 'progressBar',
          url: 'progress'
        },
        {
          title: 'graphics',
          url: 'graphic'
        },
        {
          title: 'rxjs',
          url: 'rxjs'
        },
        {
          title: 'promises',
          url: 'promises'
        }
      ],
    },
    {
      title: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          title: 'usuarios',
          url: 'usuarios'
        },
        {
          title: 'Medicos',
          url: 'medicos'
        },
        {
          title: 'Hospitales',
          url: 'hospitales'
        },

      ],
    }
  ];
}
