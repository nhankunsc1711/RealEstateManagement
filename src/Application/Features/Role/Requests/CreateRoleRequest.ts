export class CreateRoleRequest {
    public name: string;
    public description: string;
    public bitwisePermission: number;
    constructor(name: string, description: string, bitwisePermission: number) {
        this.name = name;
        this.description = description;
        this.bitwisePermission = bitwisePermission;
    }
}