import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public token;
  public identity;

  constructor( private _userService: UserService ) {
    this.page_title = 'Identificate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
   }

  ngOnInit() {
  }

  onSubmit(form) {
    // console.log(this.user);
    this._userService.signup(this.user).subscribe(
      response => {
        // TOKEN
        if (response.status !== 'error') {
          this.status = 'success';
          this.token = response;
          // OBJETO USUARIO IDENTIFICADO
          this._userService.signup(this.user, true).subscribe(
            response => {
              // TOKEN
               this.identity = response;
               console.log(this.token);
               console.log(this.identity);
            },
            error => {
              this.status = 'error';
              console.error(error);
            }
          );
          // FIN OBJETO IDENTIFICADO
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.error(error);
      }
    );
  }

}
