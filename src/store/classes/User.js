class User {
    constructor(_userName, _userId, _isAdmim) {
        this.userName = _userName;
        this.userId = _userId;
        this.isAdmin = _isAdmin;
    }
    
    get userName() {
        return this.userName;
    }

    get userId() {
        return this.userId;
    }
    
    get isAdmin() {
        return this.isAdmin;
    }

    set userName(_userName) {
        this.userName = _userName;
    }

    set isAdmin(_isAdmin) {
        this.isAdmin = _isAdmin;
    }
}