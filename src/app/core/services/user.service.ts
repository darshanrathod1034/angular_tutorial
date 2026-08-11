import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, UpdateProfilePayload, UpdateProfileResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/users`;

  // GET /users/:id  →  Fetch a single user by their ID
  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`);
  }

  // PUT /users/:id  →  Update fullname, email, phone
  updateUser(userId: string, payload: UpdateProfilePayload): Observable<UpdateProfileResponse> {
    return this.http.put<UpdateProfileResponse>(`${this.baseUrl}/${userId}`, payload);
  }

  // GET /users/allposts  →  Fetch all posts
  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/allposts`);
  }
}
