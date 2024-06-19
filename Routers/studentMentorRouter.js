import express from "express";
import { assignStudent, createMentor, createStudents, getMentors, getStudents, mentorsStudents, previousMentors } from "../Controllers/studentMentorController.js";


const router = express.Router()


router.post("/createStudents",createStudents)
router.get("/getStudents",getStudents)

router.post("/createMentor", createMentor)
router.get("/getMentors",getMentors)

router.put("/assignStudent/:id",assignStudent)

router.get("/previousMentors/:id",previousMentors)

router.get("/mentor/:id/students",mentorsStudents)

export default router