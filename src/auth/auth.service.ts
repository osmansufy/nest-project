import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException } from '@nestjs/common/exceptions';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login() {}
  async signUp(dto: AuthDto) {
    try {
      // generate hash password

      const hash = await argon.hash(dto.password);
      // create user
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      delete user.hash;

      // return user
      return user;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credential already taken',
          );
        }
      } else {
        throw error;
      }
    }
  }
}
