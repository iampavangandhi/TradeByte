// User Model (Google OAuth)

const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose);

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    balance: {
        type: Float,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.method.findSimilarType = function addAmount(id, balance) {

    account.id = id; // id of the person
    account.balance = balance; // balance in the account

    account.deposit = function addAmount(depositAmount) {
        newBalance = account.balance - depositAmount; // new balance which is current amount + added amout
        console.log("Your balance is now " + newBalance);
        if (newBalance <= 0) {
            console.log("You have insufficient funds!!!"); // if person don't have balance
        }
    };
    console.log("id: " + id + "balance: " + balance); //to dispaly the final balance with the person id 
}



module.exports = mongoose.model("User", UserSchema);