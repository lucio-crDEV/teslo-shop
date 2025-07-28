import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '@/auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})

export class LoginPageComponent {
  fb = inject(FormBuilder)
  hasError = signal(false)
  isPosting = signal(false)

  router = inject(Router)
  authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true)
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { email = '', password = '' } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);

    });
  }

  // TODO: Check Authentication

  // Registro

  // Logout


  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM2MGNmY2E0LTkxN2UtNGY1ZC1hYzA0LTRkZWU5OGE0YzkyYSIsImlhdCI6MTc1MzczMTc4OCwiZXhwIjoxNzUzNzM4OTg4fQ.6l0M4jBqh_DBht8F206rZR2Ov_3BCfVdH5lxf1kakyw

}
