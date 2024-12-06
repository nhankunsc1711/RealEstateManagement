export class UpdateContractRequest {
    public contractId: string;
    public name: string;
    public type: string;
    public description: string;
    public guestId: string;
    public employeeId: string;
    public fileURL: string;
    public issueDate: Date;
    public expiryDate: Date;
    constructor(contractId: string, name: string, type: string, description: string, guestId: string, employeeId: string, fileURL: string, issueDate: Date, expiryDate: Date) {
        this.contractId = contractId;
        this.name = name;
        this.type = type;
        this.description = description;
        this.guestId = guestId;
        this.employeeId = employeeId;
        this.fileURL = fileURL;
        this.issueDate = issueDate;
        this.expiryDate = expiryDate;
    }
}