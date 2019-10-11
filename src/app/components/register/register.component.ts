import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public status: string;
  public page_title: string;
  public user: User;

  constructor( private _userService: UserService ) {
    this.page_title = 'Registrate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
   }

  ngOnInit() {
    console.log('Se a cargado el componete de registro');
  }

  onSubmit(form) {
    this._userService.register(this.user).subscribe(
          response => {
            // console.log(response);
            if ( response.status === 'success' ) {
              this.status = response.status;
              form.reset();
            } else {
              this.status = 'Error';
            }
          },
          error => {
            this.status = 'Error';
            console.error(error);
          }
        );

  }

}
