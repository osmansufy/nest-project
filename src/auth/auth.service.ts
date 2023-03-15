import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login() {}
  signUp() {
    return {
      msg: 'You signup successfully',
    };
  }
}
