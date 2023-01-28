import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  login() {}
  signUp() {
    return 'your are sign up successfully';
  }
}
