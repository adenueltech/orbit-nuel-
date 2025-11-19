"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const users_service_1 = require("../users/users.service");
const organizations_service_1 = require("../organizations/organizations.service");
let AuthService = class AuthService {
    usersService;
    organizationsService;
    jwtService;
    constructor(usersService, organizationsService, jwtService) {
        this.usersService = usersService;
        this.organizationsService = organizationsService;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }
        if (await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        throw new Error('INVALID_PASSWORD');
    }
    async login(user) {
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
            organizationId: user.organizationId,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
    async register(createUserDto) {
        if (createUserDto.company) {
            const createOrgDto = {
                name: createUserDto.company,
                subdomain: createUserDto.email.split('@')[1].split('.').slice(0, 2).join('') +
                    Math.random().toString(36).substring(7),
            };
            const organization = await this.organizationsService.create(createOrgDto);
            createUserDto.organizationId = organization.id;
        }
        return this.usersService.create(createUserDto);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        organizations_service_1.OrganizationsService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map