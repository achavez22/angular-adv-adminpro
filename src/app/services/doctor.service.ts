import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';
import { map } from 'rxjs';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  loadDoctors(){ 
    const url = `${base_url}/medicos`;

    return this.http.get(url, this.headers)
      .pipe(
        map<any,Doctor[]>((resp:{ok :boolean,medicos:Doctor[]}) => resp.medicos)
      );
  }

  getDoctorById(id:  string){ 
    const url = `${base_url}/medicos/${id}`;

    return this.http.get(url, this.headers)
      .pipe(
        map<any,Doctor>((resp:{ok : boolean, medico : Doctor}) => resp.medico)
      );
  }


  crearDoctor(doctor: {nombre: string, hospital: string}){
    const url = `${base_url}/medicos `; 
    return this.http.post(url, doctor, this.headers);
  }

  updateDoctor(medico: Doctor){
    const url = `${base_url}/medicos/${medico._id}`; 
    return this.http.post(url, medico, this.headers);
  }


  deleteDoctor(id: string){ 
    const url = `${base_url}/medicos/${id}`;
    return this.http.delete(url, this.headers); 
  }


}
