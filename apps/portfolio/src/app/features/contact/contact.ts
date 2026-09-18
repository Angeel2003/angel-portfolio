import { Component } from '@angular/core';
import { ContactSection } from './components/contact-section/contact-section';

@Component({
  selector: 'app-contact',
  imports: [ContactSection],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {}
