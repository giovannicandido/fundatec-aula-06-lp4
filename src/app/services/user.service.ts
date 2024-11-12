import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../model/user";

const API_URL = "https://gorest.co.in/public/v2/users"
const TOKEN = "fb1aba069136bc77e9d50d2bcac5c43d981623837da96e8273ab013512081822"

@Injectable(
    {providedIn: 'root'}
)
export class UserService {

    constructor(private http: HttpClient) {
    }

    list(): Observable<User[]> {
        return this.http.get<User[]>(API_URL)
    }

    create(user: User) {
        this.http.post<any>(API_URL, user, {headers: this.createHeader()})
        .subscribe(resp => {})
    }

    private createHeader(): HttpHeaders {
        let headers = new HttpHeaders()
        headers = headers.append("Authorization", `Bearer ${TOKEN}`)
        return headers;
    }
}