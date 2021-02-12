// Write your "projects" router here!
const express = require("express");

const Projects = require("./projects-model");
const mw = require("../middleware/middleware");

const router = express.Router();

router.get("/", async (req, res) => {
    //return an array of projects
    try{
        const projects = await Projects.get();
        res.status(200).json(projects)
    } catch(error){
        res.status(404).status(error.message)
    }
});

router.get("/:id", mw.checkProjectId, async (req, res) => {
    //return a project with given ID
    const { id } = req.params;
    try {
        const projects = await Projects.get(id);
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({message: "Error retrieving the project"})
    }
});

router.post("/", async (req, res) => {
    //return newly created project
    const { name, description } = req.body;
    try {
        if(!name || !description){
            res.status(400).json({message: 'Name and descripton are required'});
        } else {
            const project = await Projects.insert(req.body);
            res.status(201).json(project);
        }
    } catch (error) {
        res.status(500).json({message: "Error adding the project"});
    }
});

router.put("/:id", mw.checkProjectId, async (req, res) => {
    //return updated project
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        if(!name || !description){
            res.status(400).json({message: 'Name and descripton are required'});
        } else {
            const project = await Projects.update(id, req.body);
            res.status(200).json(project);
        }
    } catch (error) {
        res.status(500).json({message: "Error updating the project"});
    }
});

router.delete("/:id", mw.checkProjectId, async (req, res) => {
    //delete project - no body response
    const { id } = req.params;
    try {
            const deleteProject = await Projects.remove(id);
            res.status(200).json(deleteProject);
    } catch (error) {
        res.status(404).json({message: "Error deleting the project"});
    }
});

router.get("/:id/actions", mw.checkProjectId, async (req, res) => {
    //return a actions for the given project ID
    const { id } = req.params;
    console.log(id)
    try {
        const projectActions = await Projects.getProjectActions(id);
        res.status(200).json(projectActions)
    } catch (error) {
        res.status(500).json({message: "Error retrieving the project actions"})
    }
});


module.exports = router;