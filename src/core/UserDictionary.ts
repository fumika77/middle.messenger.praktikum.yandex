export class UserDictionary {
    private static __instance;

    private __userMap: Map<number, User>;

    constructor() {
        if (UserDictionary.__instance) {
            // eslint-disable-next-line no-constructor-return
            return UserDictionary.__instance;
        }
        this.__userMap = new Map();
    }

    getUser(userId: number): Nullable<User> {
        return this.__userMap.get(userId) || null;
    }

    addUser(user: User) {
        return this.__userMap.set(user.id as number, user);
    }
}
