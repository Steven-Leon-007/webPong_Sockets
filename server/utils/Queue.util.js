class QueueUtil {
    constructor() {
        this.queue = [];
    }
    
    enqueue(user) {
        this.queue.push(user);

        this.updateUserTypes();
    }

    dequeue(dequeuedUser) {
        this.queue = this.queue.filter(queueUser => queueUser !== dequeuedUser);
        this.queue.push(dequeuedUser);
        dequeuedUser.type = "viewer";

        this.updateUserTypes();
    }

    remove(user) {
        this.queue = this.queue.filter(queueUser => queueUser.socketId !== user.socketId);

        this.updateUserTypes();
    }

    getItems() {
        return this.queue;
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    updateUserTypes() {
        if (this.queue.length >= 1) {
            this.queue[0].type = "player";
            if (this.queue.length >= 2) {
                this.queue[1].type = "player";
            }
        }
    
        if (this.queue.length > 2) {
            this.queue.slice(2).forEach(user => user.type = "viewer");
        }
    }
    
    findUserBySocketId(socketId) {
        return this.queue.find(user => user.socketId === socketId);
    }

}

export default QueueUtil;