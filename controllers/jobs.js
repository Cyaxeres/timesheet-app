const Job = require('../models/job')
const User = require('../models/user')
const Duration = require('duration')

module.exports = {
  jobs_get_all: (req, res) => {
    Job.find()
      .select('-__v')
      .populate('client', 'name')
      .exec()
      .then(jobs => {
        const newJobs = jobs.map(job => {
          return {
            _id: job._id,
            title: job.title,
            client: job.client,
            taskCount: job.tasks.length
          }
        })
        res.json(newJobs)
      })
      .catch(err => {
        res.status(404).json({
          message: 'No jobs found',
          error: err.message
        })
      })
  },

  jobs_get_job: (req, res) => {
    Job.findOne({ _id: req.params.jobId })
      .select('-__v')
      .populate({
        path: 'client',
        populate: {
          path: 'manager',
          select: 'name'
        } })
      .populate('tasks.user', 'name')
      .exec()
      .then(job => {
        const newTasks = job.tasks.map(task => {
          let duration = new Duration(
            new Date(task.start_time),
            new Date(task.end_time)
          )
          duration = duration.toString('%Hsh %Mm')
          return {
            _id: task._id,
            comments: task.comments,
            start_time: task.start_time,
            end_time: task.end_time,
            user: task.user,
            duration
          }
        })
        const newJob = {
          _id: job._id,
          title: job.title,
          client: job.client,
          tasks: newTasks
        }
        res.json(newJob)
      })
      .catch(err => res.status(404).json({ error: { message: 'Job not found', err: err.message } }))
  },

  jobs_create_tasks: (req, res) => {
    const { payload: { id }, body: { task } } = req
    if (!task.comments) {
      return res.status(422).json({
        error: 'A comment is required'
      })
    }
    if (!task.start_time) {
      return res.status(422).json({
        error: 'Start time is required'
      })
    }

    if (!task.end_time) {
      return res.status(422).json({
        error: 'End time is required'
      })
    }
    if (new Date(task.end_time).getTime() <= new Date(task.start_time).getTime()) {
      return res.status(400).json({
        error: 'Please ensure the end time comes after the start time'
      })
    }
    User.findById(id)
      .then(user => {
        Job.findOne({ _id: req.params.jobId })
          .then(job => {
            const newTask = {
              comments: task.comments,
              start_time: task.start_time,
              end_time: task.end_time,
              user: user._id
            }
            job.tasks.unshift(newTask)
            job.save().then(job => res.json(job))
          })
          .catch(err => res.status(400).json(err.message))
      })
      .catch(err => res.status(404).json({ error: { message: 'Could not update tasks', err: err.message } }))
  },

  jobs_create_job: (req, res) => {
    const { payload: { id }, body: { job } } = req
    if (!job.client) {
      return res.status(422).json({
        error: {
          client: 'This is required'
        }
      })
    }
    if (!job.title) {
      return res.status(422).json({
        error: {
          title: 'This is required'
        }
      })
    }
    User.findById(id)
      .then(user => {
        const newJob = new Job({
          title: job.title,
          client: job.client
        })
        newJob
          .save()
          .then(job => {
            Job.findOne({ _id: job._id })
              .select('-__v')
              .populate('client')
              .exec()
              .then(job => {
                res.json(job)
              })
              .catch(err => res.status(400).json({ error: err.message }))
          })
          .catch(err =>
            res.status(400).json({
              message: 'Job creation failed',
              error: err.message
            })
          )
      })
      .catch(err => res.status(401).json({ error: { message: 'You\'re not authorized to do that', err: err.message } }))
  }
}
