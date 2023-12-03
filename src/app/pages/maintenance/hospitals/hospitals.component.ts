import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit, OnDestroy{
  
  public hospitals:  Hospital[] = [];
  public loading: boolean = true;
  private imgSubs: Subscription; 
  
  constructor(
      private hospitalService : HospitalService, 
      private searchService: SearchsService,
      private modalImageService: ModalImageService){}


  ngOnInit(): void {
    this.loadHospital();

    this.imgSubs = this.imgSubs = this.modalImageService.newImage
    .pipe(delay(100))
    .subscribe(img => this.loadHospital());
  }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


  loadHospital(){ 
    this.loading = true;

    this.hospitalService.loadHospitals()
      .subscribe(hospitals =>{ 
      this.loading = false;
      this.hospitals = hospitals;
    })
  }

  saveChanges(hospital: Hospital){ 
      this.hospitalService.updateHospital(hospital._id, hospital.nombre)
        .subscribe(resp => { 
            Swal.fire('Actualizado', hospital.nombre, 'success');
        });
  }


  deleteHospital(hospital: Hospital){ 
    this.hospitalService.deleteHospital(hospital._id)
      .subscribe(resp => { 
          Swal.fire('Eliminado', hospital.nombre, 'success');
      });
}

async openSweetAlert(){ 
  const { value= ''} = await Swal.fire<string>({
    title: 'Agregar Hospital', 
    text: 'ingrese el nombre del Hospital',
    input: 'text', 
    inputPlaceholder: 'Nombre de Hospital ', 
    showCancelButton: true
  })
  
  const valueAux: string = value; 
 
  
  if(valueAux.length >  0 ){ 
    this.hospitalService.createHospital(value)
        .subscribe( (resp: any) => {
          console.log(resp); 
          this.hospitals.push(resp.hospital); 
      })
  }
}

openModal(hospital: Hospital){ 
  this.modalImageService.openModal('hospitales', hospital._id, hospital.img);
}


search(term: string) {
  if (term.length === 0) {
    return this.loadHospital();
  }
  this.searchService.search('hospitales', term)
    .subscribe(resp => this.hospitals = resp as Hospital[]);
}

}
