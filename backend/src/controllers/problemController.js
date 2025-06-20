import Problem from '../models/Problem.js';
export const createProblems = async(req,res)=>{
       
    try {
        const problem = new Problem(req.body);
        await problem.save();
        res.status(201).json({ message: "Problem created successfully", problem });
    } catch (error) {
         res.status(500).json({ error: err.message });
    }
    
}


export const getAllProblems = async(req,res) =>{
    try {
        const problems = await Problem.find();
        res.status(200).json(problems)
    } catch (error) {
         res.status(500).json({ error: err.message });
    }
}


export const getProblemById = async(req,res)=>{
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) return res.status(404).json({ message: "Problem not found" });
        res.status(200).json(problem);
    } catch (error) {
          res.status(500).json({ error: err.message });
    }
}
export default {createProblems,getAllProblems,getProblemById}