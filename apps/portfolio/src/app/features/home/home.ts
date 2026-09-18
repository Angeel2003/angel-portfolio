import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [Navbar, Hero],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}