import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Get the current logged-in user from the auth signal
  user = this.authService.currentUser;

  ngOnInit() {
    // If no user is in the signal, load from token
    if (!this.user()) {
      const userId = this.authService.getUserIdFromToken();
      if (userId) {
        this.authService.loadCurrentUser(userId).subscribe(userData => {
          this.authService.setCurrentUser(userData);
        });
      }
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToExplore() {
    this.router.navigate(['/explore']);
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
