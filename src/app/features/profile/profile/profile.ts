import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  // Signals to manage state
  user = signal<User | null>(null);
  isLoading = signal(true);
  isEditMode = signal(false);
  isSaving = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  // Reactive form with 3 editable fields
  profileForm = this.fb.group({
    fullname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
  });

  ngOnInit() {
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    // Fetch full user data from GET /users/:id
    this.userService.getUser(userId).subscribe({
      next: (userData) => {
        this.user.set(userData);
        this.isLoading.set(false);

        // Pre-fill the form with existing data
        this.profileForm.patchValue({
          fullname: userData.fullname,
          email: userData.email,
          phone: userData.phone?.toString() ?? '',
        });
      },
      error: () => {
        this.errorMessage.set('Failed to load profile. Please try again.');
        this.isLoading.set(false);
      }
    });
  }

  // Toggle between view and edit mode
  enableEditMode() {
    this.isEditMode.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');
  }

  cancelEdit() {
    this.isEditMode.set(false);
    // Reset form back to current user values
    const u = this.user();
    if (u) {
      this.profileForm.patchValue({
        fullname: u.fullname,
        email: u.email,
        phone: u.phone?.toString() ?? '',
      });
    }
  }

  // PUT /users/:id
  onSave() {
    if (this.profileForm.invalid) return;

    const userId = this.authService.getUserIdFromToken();
    if (!userId) return;

    this.isSaving.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    const payload = this.profileForm.getRawValue();

    this.userService.updateUser(userId, payload).subscribe({
      next: (res) => {
        this.user.set(res.user);             // update displayed data
        this.authService.setCurrentUser(res.user); // update signal in AuthService
        this.isEditMode.set(false);
        this.isSaving.set(false);
        this.successMessage.set(res.message || 'Profile updated successfully!');
      },
      error: () => {
        this.isSaving.set(false);
        this.errorMessage.set('Update failed. Please try again.');
      }
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
