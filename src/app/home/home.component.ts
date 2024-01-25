import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imagePath1: string = 'assets/R.jpg';
  imagePath2: string = 'assets/k.jpg';

  constructor(private router: Router) { }

  ngOnInit() {
    // Vous pouvez ajouter du code d'initialisation ici si nécessaire
  }

  shouldShow = false;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Mettre à jour le statut de la visibilité de la flèche
    this.shouldShow = window.scrollY > 20 || document.documentElement.scrollTop > 20;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  loginAction() {
    this.router.navigate(['/login']);
  }

  signupAction() {
    this.router.navigate(['/register']);
  }
}

