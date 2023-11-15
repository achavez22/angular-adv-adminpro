import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.scss']
})
export class ModalImageComponent {
  public imageUpload!: File;
  public imgTemp: any = null;

  constructor(public modalImageService: ModalImageService, 
              private fileUploadService: FileUploadService) { }

  closeModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal();
  }

  changeImage(event: any) {

    this.imageUpload = event.target.files[0];
    if (!this.imageUpload) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.imageUpload);
    reader.onload = () => {
      this.imgTemp = reader.result;
    }

  }

  
  uploadImage() {

    const id: string = this.modalImageService.id; 
    const type = this.modalImageService.type;
    this.fileUploadService.updatePhoto(this.imageUpload, type, id)
      .then((img: any) => {
        console.log(img);
        Swal.fire('Guardado', 'La imagen del usuario se guardo correctamente', 'success');
        this.modalImageService.newImage.emit(img);
       
        this.closeModal();
      }, err => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
}
