import { UserWithBase } from "../../../Domain/Models/UserAccount";
import { TagWithBase } from "../../../Domain/Models/TagModel";
import { RoleWithBase } from "../../../Domain/Models/RoleModel";
import { RealestateWithBase } from "../../../Domain/Models/RealestateModel";

export async function enrichRealEstate(inputData: any) {
    try {
        if (!Array.isArray(inputData)) {
            return await enrichSingleRealEstate(inputData);
        }

        const enrichedData = await Promise.all(inputData.map(enrichSingleRealEstate));
        return enrichedData;
    } catch (error) {
        console.error("Error in enrichRealEstate:", error);
        throw error;
    }
}

async function enrichSingleRealEstate(inputObject: any) {
    if (!inputObject.employeeId || !inputObject.tagId) {
        throw new Error("Invalid Object");
    }
    let employeeName: any = "usernotexist";
    let tagName: any = "tagnotexist";
    
    const employee = await UserWithBase.findById(inputObject.employeeId).select("fullName");
    if (employee) {
        employeeName = employee.fullName;
    }

    const tag = await TagWithBase.findById(inputObject.tagId).select("name");
    if (tag) {
        tagName = tag.name;
    }

    return {
        ...inputObject,
        employeeName: employeeName,
        tagName: tagName,
    };
}

export async function enrichUser(inputData: any) {
    try {
        if (!Array.isArray(inputData)) {
            return await enrichSingleUser(inputData);
        }

        const enrichedData = await Promise.all(inputData.map(enrichSingleUser));
        return enrichedData;
    } catch (error) {
        console.error("Error in enrichUser:", error);
        throw error;
    }
}

async function enrichSingleUser(inputObject: any) {
    if (!inputObject.roleId) {
        throw new Error("Invalid Object");
    }
    let roleName: any = "rolenotexist";
    
    const role = await RoleWithBase.findById(inputObject.roleId).select("name");
    if (role) {
        roleName = role.name;
    }

    return {
        ...inputObject,
        roleName: roleName,
    };
}

export async function enrichContract(inputData: any) {
    try {
        if (!Array.isArray(inputData)) {
            return await enrichSingleContract(inputData);
        }

        const enrichedData = await Promise.all(inputData.map(enrichSingleContract));
        return enrichedData;
    } catch (error) {
        console.error("Error in enrichContract:", error);
        throw error;
    }
}

async function enrichSingleContract(inputObject: any) {
    if (!inputObject.employeeId || !inputObject.guestId || !inputObject.realestateId) {
        throw new Error("Invalid Object");
    }
    let employeeName: any = "usernotexist";
    let guestName: any = "usernotexist";
    let realestateTitle: any = "realestatenotexist";
    
    const employee = await UserWithBase.findById(inputObject.employeeId).select("fullName");
    if (employee) {
        employeeName = employee.fullName;
    }

    const guest = await UserWithBase.findById(inputObject.guestId).select("fullName");
    if (guest) {
        guestName = guest.fullName;
    }

    const realestate = await RealestateWithBase.findById(inputObject.realestateId).select("title");
    if (realestate) {
        realestateTitle = realestate.title;
    }

    return {
        ...inputObject,
        employeeName: employeeName,
        guestName: guestName,
        realestateTitle: realestateTitle,
    };
}
