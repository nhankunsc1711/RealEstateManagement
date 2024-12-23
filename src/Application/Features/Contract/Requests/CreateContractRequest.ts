export class CreateContractRequest {
    public name: string;
    public type: string;
    public description: string;
    public checkListId: string;
    public employeeId: string;
    public fileURL: string;
    public issueDate: Date;
    public expiryDate: Date;
    constructor(name: string, type: string, description: string, checkListId: string, employeeId: string, fileURL: string, issueDate: Date, expiryDate: Date) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.checkListId = checkListId;
        this.employeeId = employeeId;
        this.fileURL = fileURL;
        this.issueDate = issueDate;
        this.expiryDate = expiryDate;
    }
}