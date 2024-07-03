import { Injectable } from '@angular/core';

import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersApiService {

    private userApiUrl = `assets/data/users.json`;

    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get<User[]>(this.userApiUrl);
    }
}
