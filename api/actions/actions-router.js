// Write your "actions" router here!
const express = require("express");

const Actions = require("./actions-model");
const mw = require("../middleware/middleware");

const router = express.Router();

router.get("/", async (req, res) => {
    //return an array of actions
    try{
        const actions = await Actions.get();
        res.status(200).json(actions)
    } catch(error){
        res.status(404).status(error.message)
    }
});

router.get("/:id", async (req, res) => {
    //return an action with given ID
    const { id } = req.params;
    try {
        const actions = await Actions.get(id);
        if(!actions){
            res.status(404).json({message:`Action with id: ${id} not found`})
        }
        res.status(200).json(actions)
    } catch (error) {
        res.status(500).json({message: "Error retrieving the action"})
    }
})

router.post("/", mw.checkProjectId, async (req, res) => {
    //return newly created action
    const { project_id, description, notes } = req.body
    try {
        if(!project_id || !description || !notes){
            res.status(400).json({message: 'Project Id, description and notes are required'});
        } else {
            const action = await Actions.insert(req.body);
            res.status(201).json(action);
        }
    } catch (error) {
        res.status(500).json({message: "Error adding the action"});
    }
});

router.put("/:id", mw.checkProjectId, async (req, res) => {
    //return updated action
    const { id } = req.params;
    const { project_id, description, notes } = req.body

    try {
        if(!project_id || !description || !notes){
            res.status(400).json({message: 'Project Id, description and notes are required'});
        } else {
            const action = await Actions.update(id, req.body);
            res.status(200).json(action);
        }
    } catch (error) {
        res.status(500).json({message: "Error updating the action"});
    }
});

router.delete("/:id", async (req, res) => {
    //delete action - no body response
    const { id } = req.params;
    try {
        if(!id){
            res.status(404).json({message:`Action with id: ${id} not found`})
        }
        const deleteAction = await Actions.remove(id);
        res.status(200).json(deleteAction);
    } catch (error) {
        res.status(500).json({message: "Error deleting the action"});
    }
});

module.exports = router;
