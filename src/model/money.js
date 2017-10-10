import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let moneySchema = new Schema({
    transaction: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Money', moneySchema);
