import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-explore',
  imports: [CommonModule],
  templateUrl: './explore.html',
  styleUrl: './explore.css'
})
export class Explore implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  posts = signal<any[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.userService.getAllPosts().subscribe({
      next: (data) => {
        // Handle both: directly an array or an object containing a posts field
        const postsArray = Array.isArray(data) ? data : (data as any).posts || [];
        this.posts.set(postsArray);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load posts:', err);
        this.errorMessage.set('Failed to load explore feed. Please try again.');
        this.isLoading.set(false);
      }
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
