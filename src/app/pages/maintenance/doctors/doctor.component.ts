import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];

  public selectedDoctor : Doctor; 
  public selectedHospital: Hospital; 

  constructor(private fb: FormBuilder, 
              private hospitalService:HospitalService, 
              private router: Router, 
              private activatedRoute:  ActivatedRoute, 
              private doctorService: DoctorService){ 

  }
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
        this.loadDoctor(id);
    })

       this.doctorForm =  this.fb.group({
      nombre: [ '', Validators.required], 
      hospital: ['', Validators.required], 
    });

    this.loadHospitales();

    this.doctorForm.get('hospital')?.valueChanges
      .subscribe( hospitalId =>{
          this.selectedHospital = this.hospitals.find(h => h._id === hospitalId);
      })
  }


  loadDoctor(id: string){ 

    if(id === 'nuevo'){ 
      return;
    }
    this.doctorService.getDoctorById(id)
    .pipe(
      delay(1000)
    )
    .subscribe((medico: any) =>{ 
        if(!medico){ 
          return this.router.navigateByUrl(`/dashboard/medicos`);
        }
        const {nombre,  hospital: {_id}} = medico; 
        this.selectedDoctor = medico; 
        this.doctorForm.setValue({nombre, hospital: _id });
    });
  }

  loadHospitales(){ 
    this.hospitalService.loadHospitals()
      .subscribe((hospitals: Hospital[])  => {
        this.hospitals = hospitals; 
      });
  }

  saveDoctor(){

    if(this.selectedDoctor){ 

      //update 
      const data ={ 
        ...this.doctorForm.value, 
        _id: this.selectedDoctor._id,
      };
      this.doctorService.updateDoctor(data)
          .subscribe(resp => {
            Swal.fire('Update', `${data._id} actualizado corectamente`, 'success');
          });
    }else{ 
      //crear
      const {nombre} = this.doctorForm.value; 
      this.doctorService.crearDoctor(this.doctorForm.value)
        .subscribe( (resp: any) => {
            console.log(resp);
            Swal.fire('Creado', `${nombre} creado corectamente`, 'success');
            this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        });
    }
      
  }
}
