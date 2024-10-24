const User = require('../models/User');
const Task = require('../models/Task')

exports.addTask = async (req, res) => {
    const { name, description, date} = req.body;
    try {
        const taskDate = new Date(date);
        const today = new Date();
        const isToday = taskDate.toDateString() === today.toDateString();
      const task = new Task({ user: req.user.id, name, description, date, isToday });
      await task.save();
      const user = await User.findById(req.user.id);
      user.tasks.push(task);
      await user.save();
      res.status(201).json({message:'task added successfully'});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

exports.getTodayTasks= async (req, res) => {
    try {
      const today = new Date();
      const tasks = await Task.find({
        user: req.user.id,
        date: {
          $gte: new Date(today.setHours(0, 0, 0, 0)),
          $lt: new Date(today.setHours(23, 59, 59, 999)),
        },
      });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


exports.GetAllTask = async(req, res)=>{
    try{
        const task = await Task.find({user: req.user.id});
        res.status(200).json(task);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
}

exports.deleteTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ error: 'Task not found' });
  
      await task.deleteOne();
      res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  