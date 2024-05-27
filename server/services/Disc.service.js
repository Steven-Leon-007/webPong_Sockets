import Disc from "../models/Disc.model.js";

class DiscService {
    createDisc(disc) {
        console.log("aaaaaa");
        this.disc = new Disc(disc);
    }
}

export default DiscService;