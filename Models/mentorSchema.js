import mongoose from "mongoose";

const mentorSchema = mongoose.Schema({
    mentorName:String,
    assignedStudents:[]
})


const Mentor = mongoose.model("Mentor", mentorSchema)

export default Mentor