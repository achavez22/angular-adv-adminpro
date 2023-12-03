import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit, OnDestroy{

  public doctors:  Doctor[] = [];
  public loading: boolean = true;

  private imgSubs: Subscription;
  constructor(private searchService: SearchsService,
              private doctorService: DoctorService, 
              private modalImageService: ModalImageService){ 

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadDoctors();

    this.imgSubs = this.imgSubs = this.modalImageService.newImage
    .pipe(delay(100))
    .subscribe(img => this.loadDoctors());
  }

  
openModal(doctor: Doctor){ 
  this.modalImageService.openModal('medicos', doctor._id, doctor.img);
}

  loadDoctors(){ 
    this.loading = true;
    this.doctorService.loadDoctors()
      .subscribe(doctors =>{ 
      this.loading = false;
      this.doctors = doctors;
    })
  }

  search(term: string) {
    if (term.length === 0) {
      return this.loadDoctors();
    }
    this.searchService.search('medicos', term)
      .subscribe(resp => this.doctors = resp as Doctor[]);
  }

  deleteDoctor(doctor: Doctor) { 

    Swal.fire({
      title: 'Eliminar Medico?',
      text: `Esta a punto de eliminar a ${doctor.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminart!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(doctor._id)
          .subscribe(resp => {

            this.loadDoctors();
            Swal.fire(
              'Eliminado!',
              `${doctor.nombre} fue eliminado.`,
              'success'
            )
          });
        // 
      }
    })
  }

}
