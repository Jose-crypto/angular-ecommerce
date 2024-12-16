import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; // Si tienes un servicio de autenticación
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,  // Si tienes un servicio de autenticación
    private router: Router
  ) {
    // Definir correctamente el FormGroup con los controles 'email' y 'password'
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // 'email' como control con validación
      password: ['', [Validators.required]]  // 'password' como control con validación
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // Llama al servicio de autenticación aquí
      this.authService.login(email, password).subscribe(
        response => {
          // Maneja la respuesta del login
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']); // Redirige a otra página
        },
        error => {
          console.error('Error en el inicio de sesión', error);
        }
      );
    }
  }
}