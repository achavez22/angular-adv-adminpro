import { Component } from '@angular/core';
import { SidebarServiceService } from 'src/app/services/sidebar-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  munuItems: any[]= [];

  constructor(private sideBarService: SidebarServiceService){
    this.munuItems = sideBarService.menu;
  }
}
