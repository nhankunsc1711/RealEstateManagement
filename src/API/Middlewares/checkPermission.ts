import UserRepository from "../../Infrastructure/Persistences/Respositories/UserRepository";
import IUserRepository from "../../Application/Persistences/IRepositories/IUserRepository";
import RoleRepository from "../../Infrastructure/Persistences/Respositories/RoleRepository";
import IRoleRepository from "../../Application/Persistences/IRepositories/IRoleRepository";

export function hasPermission(bitwisePermission: number) {
    return async (req: any, res: any, next: any) => {
        const userRepository: IUserRepository = new UserRepository();
        const roleRepository: IRoleRepository = new RoleRepository();
        try {
            const userId: string = (req as any).user?.userId;
            if (userId == null) {
                res.status(401).send("Unauthorized");
            }
            const query = {
                isActived: true,
                isDeleted: false,
            }

            const user: any = await userRepository.getUserById({userId, ...query});

            const roleId = user.roleId;

            const role: any = await roleRepository.getRoleById({roleId, ...query});

            if (role == null) {
                return res.status(500).send("Internal Server Error");
            }

            console.log("Role Permission: ", role.bitwisePermission);
            console.log("Bitwise Permission: ", bitwisePermission);
            if ((role.bitwisePermission & bitwisePermission) === 0) {
                return res.status(403).send("You dont have permission to access this route");
            }

            next();
        } catch (error: any) {
            return res.status(500).json({error: `Error occured at check permission middleware: ${error.message}`})
        }
    }
}