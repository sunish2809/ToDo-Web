const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');

exports.addProject = async (req, res) => {
    const { name, description, todos } = req.body;
    
    try {
        // Create a new project
        const project = new Project({ user: req.user.id, name, description });
        
        // Iterate over the todos array and create tasks
        const taskPromises = todos.map(async todo => {
            const taskDate = new Date(todo.date);
            const today = new Date();
            const isToday = taskDate.toDateString() === today.toDateString();

            const task = new Task({ 
                user: req.user.id, 
                name: todo.name, 
                description: todo.description, 
                date: taskDate, 
                isToday 
            });
            
            await task.save(); // Save the task
            project.tasks.push(task._id); // Add the task ID to the project's tasks array
        });
        
        await Promise.all(taskPromises); // Wait for all tasks to be created
        
        await project.save(); // Save the project with all the tasks
        const user = await User.findById(req.user.id);
        user.projects.push(project);
        await user.save();
        
        res.status(201).json({message:"project added successfully"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getAllProjects = async (req, res) => {
    try {
      const projects = await Project.find({ user: req.user.id });
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    await project.deleteOne();
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('tasks');
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Ensure the project belongs to the authenticated user
    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to access this project' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addTodoToProject = async (req, res) => {
  const { name, description, date } = req.body;

  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const taskDate = new Date(date);
    const today = new Date();
    const isToday = taskDate.toDateString() === today.toDateString();

    // Create a new task
    const task = new Task({
      user: req.user.id,
      name,
      description,
      date: taskDate,
      isToday,
      project: project._id
    });

    await task.save();
    project.tasks.push(task._id);
    await project.save();

    res.status(201).json(task); // Return the created task
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

