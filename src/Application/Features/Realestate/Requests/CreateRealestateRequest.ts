export class CreateRealestateRequest {
    public title: string;
    public description: string;
    public address: string;
    public area: string;
    public price: string;
    public utilities: string;
    public tagName: string;
    public employeeId: string;
    public imagePath: string;
    constructor(title: string, description: string, address: string, area: string, price: string, utilities: string, tagName: string, employeeId: string, imagePath: string) {
        this.title = title;
        this.description = description;
        this.address = address;
        this.area = area;
        this.price = price;
        this.utilities = utilities;
        this.tagName = tagName;
        this.employeeId = employeeId;
        this.imagePath = imagePath;
    }
}