import * as bcrypt from 'bcrypt'

export default class SecurityHelper {
    public static IsHashVerified(hash: string, value: string): boolean {
        return bcrypt.compareSync(value, hash);
    }

    public static HashPassword(value: string): string {
        return bcrypt.hashSync(value, 10);
    }
}