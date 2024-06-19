import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  studentName: String,
  mentor: [],
  allMentors: []
});

const Students = mongoose.model("Students", studentSchema);
export default Students;
