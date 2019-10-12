import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


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

  constructor( private _userService: UserService, private _router: Router, private _route: ActivatedRoute  ) {
    this.page_title = 'Identificate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
   }

  ngOnInit() {

    // Se ejecuta siempre y cierra sesion solo cuando le llega el parametro sure por la url
    this.logout();

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

               // PERSISTIR DATOS USUARIO IDENTIFICADO
               localStorage.setItem('token', this.token);
               localStorage.setItem('identity', JSON.stringify(this.identity));
               // Redireccion a la pagina principal
               this._router.navigate(['home']);
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

  logout() {
    this._route.params.subscribe( params => {
          const logout = +params['sure'];

          if (logout == 1 ) {
            localStorage.removeItem('identity');
            localStorage.removeItem('token');

            this.identity = null;
            this.token = null;

            // Redireccion a la pagina principal
            this._router.navigate(['home']);

          }
    } );
  }

}
