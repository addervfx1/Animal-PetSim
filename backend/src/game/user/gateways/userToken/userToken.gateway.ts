import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AccessToken } from './interfaces/accessToken';
import { sign, verify } from 'jsonwebtoken';
import { RefreshToken } from './interfaces/refreshToken';
import { User } from "../../entities/user.entity";
import { ConfigHelper } from "../../helpers/ConfigHelper";
import { UserRepositoryService } from "../../user.repository.service";

@Injectable()
export class UserTokenGateway {
    constructor(
        private readonly userRepository: UserRepositoryService
    ){}

    async generateTokens(user: User, tokenMetadata?: string): Promise<[string, string]> {
        const accessToken = this.generateAccessToken(user, tokenMetadata);
        const refreshToken = this.generateRefreshToken(user);

        return [accessToken, refreshToken];
    }

    private generateAccessToken(user: User, tokenMetadata?: string): string {
        const metadataObject: { [key: string]: any } = { ...tokenMetadata ? JSON.parse(tokenMetadata) : undefined };
    
        const payload: AccessToken = {
            userId: user.id,
            metadata: metadataObject
        }

        return sign(
            payload,
            ConfigHelper.getAccessTokenSecret(),
            { expiresIn: `${ConfigHelper.getAccessTokenExpiration()}m` }
        );
    }

    private generateRefreshToken(user: User): string {
        const payload: RefreshToken = {
            userId: user.id
        }

        return sign(
            payload,
            ConfigHelper.getRefreshTokenSecret(),
            { expiresIn: `${ConfigHelper.getRefreshTokenExpiration()}m` }
        );
    }

    async handleRefreshToken(refreshToken: string): Promise<[string, string]> {
        const refreshTokenDecoded = this.getRefreshToken(refreshToken);

        const user = await this.userRepository.findOne(refreshTokenDecoded.userId);
        if (user == null)
            throw new UnauthorizedException();

        return await this.generateTokens(user);
    }

    private getRefreshToken(refreshToken: string) {
        try {
            // const decodedToken = decode(refreshToken, { complete: true });
            // const payload = decodedToken.payload as RefreshToken;
            const token = verify(refreshToken, ConfigHelper.getRefreshTokenSecret()) as RefreshToken;
            if (!token)
                throw new UnauthorizedException();

            return token;
        } catch(e: any) {
            throw new UnauthorizedException(e);
        }
    }
}