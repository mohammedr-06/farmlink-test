import { Component, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() titleName: any;
  pageTitle: any;
  userName:any="";
  constructor( private authService:AuthService ) {
    const userInfo = this.authService.getUserInfo();   
    this.userName =userInfo.contactName;

  }
  ngOnInit() {
    this.pageTitle = this.titleName;

  }

}
