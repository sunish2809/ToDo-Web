const express = require('express')
const {
    signin,
    signup,
  } = require('../controllers/authController');
  const {
    addTask,
    deleteTask,
    getTodayTasks,
    GetAllTask 
  } = require('../controllers/taskController');
  const {
    addProject,
    deleteProject,
    getAllProjects ,
    getProjectById,
    addTodoToProject,
  } = require('../controllers/projectController');
  const authMiddleware= require('../middleware/auth');
  const {updateUser,getUserDetails}  = require('../controllers/userController')
  
  const router = express.Router();
  


//auth routes
router.post('/signin',signin);
router.post('/signup',signup);


// Task Routes
router.post('/task', authMiddleware, addTask);
router.get('/tasks/today', authMiddleware, getTodayTasks);   // Get today's tasks
router.get('/tasks', authMiddleware, GetAllTask );   
router.delete('/task/:id', authMiddleware, deleteTask);

// Project Routes
router.post('/project', authMiddleware, addProject);
router.get('/projects', authMiddleware, getAllProjects);  
router.delete('/project/:id', authMiddleware, deleteProject);
router.get('/project/:id', authMiddleware, getProjectById);
router.post('/project/:id/add-todo', authMiddleware, addTodoToProject);



// User Settings
router.put('/user', authMiddleware, updateUser );
router.get('/userdetail',authMiddleware,getUserDetails)

module.exports = router;