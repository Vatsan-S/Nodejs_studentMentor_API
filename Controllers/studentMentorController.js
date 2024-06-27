import Students from "../Models/studentSchema.js";
import Mentor from "../Models/mentorSchema.js";

export const createStudents = async (req, res) => {
  try {
    const newStudent = new Students(req.body);
    await newStudent.save();
    console.log("Student Created successfully");
    res
      .status(200)
      .json({ message: "Student created successfully", data: newStudent });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in student creation" });
  }
};

export const getStudents = async (req, res) => {
  try {
    const allStudents = await Students.find();
    res.status(200).json({ allStudents });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error in get students" });
  }
};

export const createMentor = async (req, res) => {
  try {
    const newMentor = new Mentor(req.body);
    await newMentor.save();
    console.log("Mentor created Successfully");
    res.status(200).json({ data: newMentor });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in creating mentor" });
  }
};

export const getMentors = async (req, res) => {
  try {
    const mentorsList = await Mentor.find();
    res.status(200).json({ data: mentorsList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error in get mentors" });
  }
};

export const assignStudent = async (req, res) => {
  const mentorID = req.params.id;
  const { arrayOfStudents } = req.body;
  let selectedMentor = await Mentor.find({ _id: mentorID });
  if(!selectedMentor){
    return res.status(404).json({message:"Mentor not found"})
  }

  //-------------------------------------------------------removing students from previous mentors----------------------------------------------------------

  for (const ele of arrayOfStudents) {
    let selectedStudent = await Students.find({ _id: ele });
    console.log("selectedStudent", selectedStudent)
    if(!selectedStudent){
      return res.status(404).json({messgae:"Student not found"})
    }
   else{
    let allMentors = selectedStudent[0].allMentors;
    // console.log(allMentors)
    if (allMentors.length > 0) {
      let lastMentor = allMentors[allMentors.length - 1];
      let lastMentorDetails = await Mentor.find({ _id: lastMentor });
      let assignedStudents = lastMentorDetails[0].assignedStudents;
      // console.log(assignedStudents)
      let index = assignedStudents.indexOf(ele);
      if (index > -1) {
        assignedStudents.splice(index, 1);
        // console.log("Removed Successfully",selectedStudent)
        await Mentor.updateOne({ _id: lastMentor }, { assignedStudents });
        console.log("Returned");
      } else {
        console.log("student not found", selectedStudent);
        console.log("not");
      }
    }
   }
  }

  //-------------------------------------------------------setting assigned students------------------------------------------------------------------------------
  
  let existingStudents = selectedMentor[0].assignedStudents;
  let newStudents = arrayOfStudents.filter(
    (ele) => !existingStudents.includes(ele)
  );
  let assignedStudents = existingStudents.concat(newStudents);
  await Mentor.updateOne({ _id: mentorID }, { assignedStudents });

  //----------------------------------------------------Updating students mentor section------------------------------------------------------------------------
  newStudents.forEach(async (ele) => {
    let newbies = await Students.find({ _id: ele });
    let allMentors = newbies[0].allMentors;
    allMentors.push(mentorID);
    let mentor = [mentorID];

    await Students.updateOne({ _id: ele }, { allMentors, mentor });
    // console.log(newbiesMentors)
  });
  // console.log(newStudents)
  res.status(200).json({message:"Students assigned",data:selectedMentor});
};

export const previousMentors = async (req, res) => {
  try {
    const studentID = req.params.id;
    let selectedStudent = await Students.find({ _id: studentID });
    let result = selectedStudent[0].allMentors;
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(Error);
    res
      .status(500)
      .json({ message: "Internal server error in getting previous mentors" });
  }
};

export const mentorsStudents = async (req, res) => {
  try {
    const mentorID = req.params.id;
    const selectedMentor = await Mentor.find({ _id: mentorID });
    const allStudents = selectedMentor[0].assignedStudents;
    res
      .status(200)
      .json({
        message: `student list of mentor ${selectedMentor[0].mentorName}`,
        data: allStudents,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error on get students of a mentor" });
  }
};
