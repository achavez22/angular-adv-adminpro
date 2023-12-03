import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen',
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type:string): string {
    
      if(!img){
          return `${ base_url }/upload/${type}/no-image`;
      }else if(img?.includes('https')){ 
          return img;
      }else if(img){
          return `${ base_url }/upload/${type}/${img}`;
      }else{ 
          return `${ base_url }/upload/${type}/no-image`;
      }
  }

}
