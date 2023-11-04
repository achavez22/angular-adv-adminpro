
import { environment } from "src/environments/environment";

const base_url = environment.base_url; 

export class User{ 

    constructor(
        public name: string, 
        public email: string, 
        public password?: string, 
        public img?: string,
        public role?: string,
        public google?: string, 
        public uid?: string, 
    ){}

    get imageUrl(){

        if(this.img?.includes('https')){ 
            return this.img;
        }
        if(this.img){
            return `${ base_url }/upload/usuarios/${ this.img }`;
        }else{ 
            return `${ base_url }/upload/usuarios/no-image`;
        }
    }


}