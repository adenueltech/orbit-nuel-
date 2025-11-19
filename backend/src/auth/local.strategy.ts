import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.authService.validateUser(email, password);
      return user;
    } catch (error) {
      if (error.message === 'USER_NOT_FOUND') {
        throw new BadRequestException(
          'Account not found. Please create an account first.',
        );
      } else if (error.message === 'INVALID_PASSWORD') {
        throw new UnauthorizedException(
          'Invalid email or password combination.',
        );
      }
      throw new UnauthorizedException();
    }
  }
}
