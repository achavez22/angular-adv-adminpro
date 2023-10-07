import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription; 

  constructor() {
    // this.returnObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   valor => console.log('subs', valor),
    //   (error) => console.warn('Error: ', error),
    //   () => console.log('Obs terminado'),
    // );

   this.intervalSubs =  this.returnInterval().subscribe(console.log)

  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }


  returnInterval(): Observable<number> {
    return interval(500)
      .pipe(
        map(value => {
          return value;
        }),
        filter(value => (value % 2 === 0)? true: false),
        take(10),
      );
  }

  returnObservable(): Observable<number> {

    let i: number = -1;

    return new Observable<number>(observer => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i llego al valor de 2');
        }
      }, 1000)
    });


  }


}
