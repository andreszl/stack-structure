import {WebSocket} from '../socket'

class Users extends WebSocket {
    public _id: string
    public name : string
    public role: string
    public status: boolean;

    constructor( id: string, name: string, role: string, status: boolean){
        super();
        this._id = id;
        this.name = name;
        this.role = role
        this.status = status;

    }
    
    public toJson() {
        return {
            _id: this._id,
            name: this.name,
            role: this.role,
            status: this.status
        }
    }
    
    public notify() {     
        super.emit('newUser', this.toJson())
    }
}

export default Users