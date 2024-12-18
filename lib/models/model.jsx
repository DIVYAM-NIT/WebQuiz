import mongoose from "mongoose"


const divyamModel= new mongoose.Schema(
    {
        Question_1: {type: String},
        Question_2: {type: String},
        Question_3: {type: String},
        Question_4: {type: String},
    }
);

export const NewUser = mongoose.models.Questions || mongoose.model("Questions",divyamModel);