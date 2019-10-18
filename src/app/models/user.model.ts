export class UserModel {
    public name: string;
    public room: string;

    constructor(name: string) {
        this.name = name;
        this.room = 'Not-Room-Yet';
    }
}