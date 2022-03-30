const mongoose = require("mongoose")


expenseSchema =  new mongoose.Schema({
    color:{type:String, required:true},
    tag:{type:String, required:true},
    expense:{type:Number, required: true},
    recure:{type:Boolean, default:false},
    date:{type:Date, required:true, },

})

userDataSchema = new mongoose.Schema({
    username:{type:String, required:true},
    potSum:{type:Number, default: 0.0},
    budget:{type:Number, defalut: 0.0},
    budgetDivision:{type:String, default:"weekly"},
    expenses:[expenseSchema]
},{timestamps:true})

module.exports = mongoose.model("userData", userDataSchema);