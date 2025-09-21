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
exports.CreateFileDto = void 0;
const class_validator_1 = require("class-validator");
class CreateFileDto {
    name;
    type = 'file';
    fileType;
    size;
    uploadedById;
    organizationId;
    projectId;
    shared = false;
    starred = false;
    permissions = 'view';
    tags = [];
    preview;
}
exports.CreateFileDto = CreateFileDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFileDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['folder', 'file']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFileDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['document', 'image', 'video', 'audio', 'archive', 'other']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFileDto.prototype, "fileType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFileDto.prototype, "size", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFileDto.prototype, "uploadedById", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFileDto.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateFileDto.prototype, "projectId", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateFileDto.prototype, "shared", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateFileDto.prototype, "starred", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['view', 'edit', 'admin']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFileDto.prototype, "permissions", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateFileDto.prototype, "tags", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFileDto.prototype, "preview", void 0);
//# sourceMappingURL=create-file.dto.js.map