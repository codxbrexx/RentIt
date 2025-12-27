import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserProfile, UserRole } from '../../database/entities';
import { RegisterDto, LoginDto, AuthResponseDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private readonly profileRepository: Repository<UserProfile>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    // Check if user exists
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email.toLowerCase() },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(dto.password, 12);

    // Create user
    const user = this.userRepository.create({
      email: dto.email.toLowerCase(),
      passwordHash,
      role: dto.role || UserRole.RENTER,
    });

    await this.userRepository.save(user);

    // Create profile
    const profile = this.profileRepository.create({
      userId: user.id,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });

    await this.profileRepository.save(profile);

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Save refresh token
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: profile.firstName,
        lastName: profile.lastName,
        emailVerified: user.emailVerified,
      },
      ...tokens,
    };
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email.toLowerCase() },
      relations: ['profile'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.profile?.firstName,
        lastName: user.profile?.lastName,
        avatarUrl: user.profile?.avatarUrl,
        emailVerified: user.emailVerified,
      },
      ...tokens,
    };
  }

  async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Access denied');
    }

    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Access denied');
    }

    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.profile?.firstName,
        lastName: user.profile?.lastName,
        avatarUrl: user.profile?.avatarUrl,
        emailVerified: user.emailVerified,
      },
      ...tokens,
    };
  }

  async logout(userId: string): Promise<void> {
    await this.userRepository.update(userId, { refreshToken: '' });
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });
  }

  private async generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('jwt.accessExpiresIn'),
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('jwt.refreshExpiresIn'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
    await this.userRepository.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
}
