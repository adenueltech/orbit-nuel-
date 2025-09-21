export declare class CreateFileDto {
    name: string;
    type?: string;
    fileType?: string;
    size?: string;
    uploadedById: number;
    organizationId: number;
    projectId?: number;
    shared?: boolean;
    starred?: boolean;
    permissions?: string;
    tags?: string[];
    preview?: string;
}
