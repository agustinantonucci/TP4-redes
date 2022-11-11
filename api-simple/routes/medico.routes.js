module.exports = app => {
    const medicos = require("../controllers/medicoController.js");
  
    let router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", medicos.create);
  
    // Retrieve all Tutorials
    router.get("/", medicos.findAll);
  
    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    // router.get("/:id", medicos.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use('/api/medicos', router);
  };
  