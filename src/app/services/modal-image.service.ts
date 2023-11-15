import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hideModal: boolean = true;
  
  public type: 'usuarios'|'medicos'|'hospitales';
  public id: string;
  public img: string;

  public newImage: EventEmitter<string> = new EventEmitter<string>();


  get hideModal(){ 
    return this._hideModal;
  }

  openModal(
    type: 'usuarios'|'medicos'|'hospitales', id: string, img?: string){ 
    this._hideModal = false;
    this.type = type;
    this.id = id;
    // this.img = img;
    if(img !== undefined && img.includes('https')){ 
      this.img =  img; 
    }else{ 
      this.img = `${base_url}/upload/${type}/${img}`;
    }
  }

  closeModal(){ 
    this._hideModal = true;
  }

  constructor() { }
}
