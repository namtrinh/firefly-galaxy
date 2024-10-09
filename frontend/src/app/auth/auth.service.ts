import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = "http://localhost:8888/identity/login"
  private tokenKey = 'auth_token'
  private refreshUrl = "http://localhost:8888/identity/login/refresh"
  private logoutUrl =  "http://localhost:8888/identity/login/logout"
  private authe_code = "http://localhost:8888/identity/login/verify_code"
  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem(this.tokenKey);
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.loginUrl}`, { email, password })

  }

  refreshToken(token: any) {
    return this.http.post<any>(`${this.refreshUrl}`, { token })
      .pipe(
        tap(response => {
          const newToken = response.result.token;
          localStorage.setItem(this.tokenKey, newToken);
          console.log(`Status: `, response.code, `, Token refreshed successfully !`);
        }),
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  logout(token: any) {
    return this.http.post(`${this.logoutUrl}`, { token })
      .pipe(
        tap(response => {
          const res = response;
          this.router.navigate(['/login']);
        }),
      );
  }

  verifyLogin(email:string, auth_code:string):Observable<any> {
    const params = new HttpParams()
    .set('email', email.toString())
    .set('auth_code', auth_code.toString());

    return this.http.post<any>(`${this.authe_code}`,null, {params})
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.result.token);
          const token = localStorage.getItem(this.tokenKey);
          console.log(`Status: `, response.code, `, Login successful`);
        })
      );
  }



  getToken(): string | null {
    // Lấy token từ localStorage
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    // Kiểm tra xem token có tồn tại hay không để biết người dùng đã đăng nhập
    return !!this.getToken();
  }

  removeToken() {
    // Xóa token khỏi localStorage khi người dùng đăng xuất
    localStorage.removeItem(this.tokenKey);
  }


}
