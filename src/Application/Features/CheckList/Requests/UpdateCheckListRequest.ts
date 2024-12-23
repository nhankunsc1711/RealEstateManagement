export class UpdateCheckListRequest {
    public checkListId: string;
    public guestId: string;
    public employeeId: string;
    public realestateId: string;
    public appointmentDate: Date;
    constructor(checkListId: string, guestId: string, employeeId: string, realestateId: string, appointmentDate: Date) {
        this.checkListId = checkListId;
        this.guestId = guestId;
        this.employeeId = employeeId;
        this.realestateId = realestateId;
        this.appointmentDate = appointmentDate;
    }
}