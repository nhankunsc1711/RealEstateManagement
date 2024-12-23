export class UpdateRoleRequest {
    public roleId: string;
    public name: string;
    public description: string;
    public bitwisePermission: number;


    constructor(roleId: string, name: string, description: string, bitwisePermission: number) {
        this.roleId = roleId;
        this.name = name;
        this.description = description;
        this.bitwisePermission = bitwisePermission;
    }
}