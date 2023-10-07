import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-brandcrumbs',
  templateUrl: './brandcrumbs.component.html',
  styles: [
  ]
})
export class BrandcrumbsComponent implements OnDestroy{

  public title: string = '';
  public titleSubs$: Subscription;

  constructor(private router: Router) {
    this.titleSubs$ = this.getArgumentsRute().subscribe((data) => {
      this.title = data['title'];
      document.title = this.title;
    });

  }
  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getArgumentsRute() {
    return this.router.events.pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map(event => event.snapshot.data),
    );

  }
}
