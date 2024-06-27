import mongoose from "mongoose";

const mentorSchema = mongoose.Schema({
  mentorName: {
    type: String,
    required: true,
    unique: true,
  },
  assignedStudents: [],
});

const Mentor = mongoose.model("Mentor", mentorSchema);

export default Mentor;
