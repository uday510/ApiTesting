const mongoose = require("mongoose");


const clientSchema = new mongoose.Schema({

    data: {
        type: Object,
    },
    dateCreated: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now();
        }
    }
});

module.exports = mongoose.model("Client", clientSchema);
