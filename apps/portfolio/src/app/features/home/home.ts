import { Component } from '@angular/core';
import { About } from './components/about/about';
import { Hero } from './components/hero/hero';
import { Experience } from '../experience/experience';
import { Projects } from '../projects/projects';
import { Skills } from '../skills/skills';
import { Contact } from '../contact/contact';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [Navbar, Hero, About, Experience, Projects, Skills, Contact],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
