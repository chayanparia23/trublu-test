import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavElement } from 'src/app/modules/shared/models/nav-element.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  public navList: NavElement[] = [
    {
      id: 1,
      name: 'Dashboard',
      link: '/dashboard',
      icon: 'fa fa-th-large fa-lg'
    },
    {
      id: 2,
      name: 'Insights',
      link: '/insights',
      icon: 'fa fa-bar-chart fa-lg'
    },
    {
      id: 3,
      name: 'Users',
      link: '/users',
      icon: 'fa fa-users fa-lg'
    },
    {
      id: 4,
      name: 'Settings',
      link: '/settings',
      icon: 'fa fa-cog fa-lg'
    }
  ]

  constructor(public router: Router){}
}
