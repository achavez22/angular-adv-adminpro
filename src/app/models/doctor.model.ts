import { Hospital } from "./hospital.model";

interface _doctorUser { 
    _id: string;
    nombre: string;
    img: string;
}

export class Doctor { 

    constructor(
        public nombre:  string, 
        public _id?: string, 
        public img?: string, 
        public user?: _doctorUser, 
        public hoapital?: Hospital, 
    ){}
}