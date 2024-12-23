export enum BitwisePermissionEnums {
    ViewRealestate = 0, 
    //Guest
    GuestPermissionEnums = 1 << 0,

    //Employee
    EmployeePermission = 1 << 1,
    
    //Manager
    ManagerPermission = 1 << 2,
}