import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  studentName: {
    type:String,
    required: true,
    unique: true,
  },
  mentor: [],
  allMentors: []
});

const Students = mongoose.model("Students", studentSchema);
export default Students;
