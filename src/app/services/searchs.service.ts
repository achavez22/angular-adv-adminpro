import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchsService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {'x-token': this.token}
    }
  }

  private TranformerUsers(results: any[]): User[]{ 
    return results.map( user => new User(user.name, user.email, '', user.img,user.role, user.google,user.uid));
  }

  private TranformerHospitals(results: any[]): Hospital[]{ 
    return results; 
  }

  private TranformerDoctors(results: any[]): Doctor[]{ 
    return results; 
  }

  search(type : 'usuarios' | 'medicos' | 'hospitales', term: String){ 

    const url = `${base_url}/todo/coleccion/${type}/${term}`;

    return this.http.get<any[]>(url, this.headers)
    .pipe(
        map( (resp:any) => {

            switch(type){
              case 'usuarios': 
                  return this.TranformerUsers(resp.resultados);

              case 'hospitales': 
                return this.TranformerHospitals(resp.resultados);

              case 'medicos': 
              return this.TranformerDoctors(resp.resultados);

                default:
                  return [];
            }
          })
    )
  }
}
