import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarServiceService {

  constructor() { }

  menu: any[] = [
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
    }
  ];
}
