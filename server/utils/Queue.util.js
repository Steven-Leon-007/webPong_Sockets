class QueueUtil {
    constructor() {
        this.queue = [];
    }
    
    enqueue(user) {
        this.queue.push(user);
    }

    dequeue(dequeuedUser) {
        this.queue = this.queue.filter(queueUser => queueUser !== dequeuedUser);
        this.queue.push(dequeuedUser);
    }

    remove(user) {
        this.queue = this.queue.filter(queueUser => queueUser.socketId !== user.socketId);
    }

    getItems() {
        return this.queue;
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    findUserBySocketId(socketId) {
        return this.queue.find(user => user.socketId === socketId);
    }

}

export default QueueUtil;