const Projects = require("../projects/projects-model");

const checkProjectId = async (req, res, next) => {
    const { id } = req.params;
    const project = await Projects.get(id);
    try {
        if(!project){
            res.status(404).json({message: `No project with id: ${id} found`})
        } else {
            req.project = project
            next()
        }
    } catch (error) {
        res.status(500).json(`Server error: ${error}`)
    }
};

module.exports = {checkProjectId};