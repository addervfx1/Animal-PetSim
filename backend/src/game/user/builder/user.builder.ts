import { User } from "../entities/user.entity";
import SecurityHelper from "../helpers/SecurityHelper";

export default class UserBuilder {
    public static buildUser(name: string, email: string, password?: string): User {
        const user = new User();
        user.name = name;
        user.email = email;
        if (password)
            user.password = SecurityHelper.HashPassword(password);
        return user;
    }
}   