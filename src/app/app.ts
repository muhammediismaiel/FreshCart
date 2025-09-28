import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NavBar } from "../shared/nav-bar/nav-bar";
import { Footer } from '../shared/footer/footer';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('FreshCart');
   ngOnInit(): void {
    initFlowbite();
  }
}
