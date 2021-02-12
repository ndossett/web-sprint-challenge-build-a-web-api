const Projects = require("../projects/projects-model");

const checkProjectId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const project = await Projects.get(id);
        if(!project){
            res.status(400).json({message: `No project with id: ${id}`})
        } else {
            req.project = project
            next()
        }
    } catch (error) {
        res.status(500).json(`Server error: ${error}`)
    }
};

module.exports = checkProjectId;