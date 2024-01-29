import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, public authService:AuthService) {
  }
  ngOnInit() {
    console.log("Login"+this.authService.checkIsLoggedIn);
  }
}
