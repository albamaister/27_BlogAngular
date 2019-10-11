import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
    console.log(this.user.email);
    console.log(this._userService.test());
    form.reset();
  }

}
