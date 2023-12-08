import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarServiceService } from '../services/sidebar-service.service';

declare function customInitFunction();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  
  constructor(private settingService: SettingsService,
              private sidebarService: SidebarServiceService){}

  ngOnInit(): void {
    customInitFunction();
    this.sidebarService.loadMenu();
  }

}
