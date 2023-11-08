import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public user: User; 
  public imageUpload: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder, 
              private usuarioService: UsuarioService, 
              private fileUploadService: FileUploadService){ 
                this.user = usuarioService.user; 
              }
  ngOnInit(): void {
      this.profileForm = this.fb.group({ 
        name: [this.user.name, Validators.required], 
        email: [this.user.email, [Validators.required, Validators.email]], 
      });
    
  }


  updateProfile(){ 
    console.log(this.profileForm.value);
    this.usuarioService.updateProfile(this.profileForm.value)
      .subscribe(() =>{
        // console.log(resp);
        const {name, email} = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;

        Swal.fire('Guardado', 'Los datos del usuario fueron guardados', 'success'); 
      }, err =>{
        // console.log(err);
        Swal.fire('Error', err.error.msg, 'error'); 
        
      });
    
  }

  changeImage(event:any) {
    
    this.imageUpload = event.target.files[0];
    if(!this.imageUpload){
      return this.imgTemp = null;
    }

    const reader  = new FileReader();
    reader.readAsDataURL(this.imageUpload); 
    reader.onload = () =>{ 
      this.imgTemp = reader.result; 
    }


  }

  uploadImage(){
    this.fileUploadService.updatePhoto(this.imageUpload, 'usuarios', this.user.uid)
      .then((img: any) => {
        this.user.img = img;
        console.log(img);
          Swal.fire('Guardado', 'La imagen del usuario se guardo correctamente', 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error'); 
      }); 
  }

}
