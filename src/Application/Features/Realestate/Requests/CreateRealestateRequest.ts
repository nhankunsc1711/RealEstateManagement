export class CreateRealestateRequest {
    public title: string;
    public description: string;
    public address: string;
    public type: string;
    public area: string;
    public price: string;
    public utilities: string;
    public employeeId: string;
    public imagePath: string;
    constructor(title: string, description: string, address: string, type: string, area: string, price: string, utilities: string, employeeId: string, imagePath: string) {
        this.title = title;
        this.description = description;
        this.address = address;
        this.type = type;
        this.area = area;
        this.price = price;
        this.utilities = utilities;
        this.employeeId = employeeId;
        this.imagePath = imagePath;
    }
}