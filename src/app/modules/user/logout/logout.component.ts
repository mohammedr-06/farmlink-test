import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../../auth/auth.service';
import { AlertService } from '../../shared/alert';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor( public router: Router, public authService:AuthService,public alertService:AlertService ) {
         
  }
  ngOnInit() {
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
