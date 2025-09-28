import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar implements OnInit {
  localIsLogin = false;
  pages: { title: string; path: string }[] = [
    { path: 'home', title: 'Home' },
    { path: 'product', title: 'Product' },
    { path: 'category', title: 'Category' },
    { path: 'cart', title: 'Cart' },
  ];
  authPages: { title: string; path: string }[] = [
    { path: 'login', title: 'Login' },
    { path: 'register', title: 'Register' },
  ];

  constructor(
    private authService: AuthService
  ) {
    authService.isLogin.subscribe({
      next: (isLogin) => {
        this.localIsLogin = isLogin;
      },
    });
  }

  ngOnInit(): void {
    initFlowbite();
  }

  logOut() {
    this.authService.logOut();
  }
}
