export class CreateCheckListRequest {
    public guestId: string;
    public employeeId: string;
    public realestateId: string;
    public appointmentDate: Date;
    constructor(guestId: string, employeeId: string, realestateId: string, appointmentDate: Date) {
        this.guestId = guestId;
        this.employeeId = employeeId;
        this.realestateId = realestateId;
        this.appointmentDate = appointmentDate;
    }
}