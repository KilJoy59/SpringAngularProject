import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../_service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  constructor(private _authService: AuthService, public router: Router) {
  }

  ngOnInit() {
  }

  onSidenavClose = () => {
    this.sidenavClose.emit();
  };

  onClick(): void {
    this._authService.logout()
      .pipe()
      .subscribe(res => {
        this.router.navigateByUrl('/login');
      });
  }

}
