const express = require('express')
const router = express.Router()
const auth = require('../auth')
const JobsController = require('../../controllers/jobs')

router.get('/', auth.optional, JobsController.jobs_get_all)

router.get('/:jobId', auth.optional, JobsController.jobs_get_job)

router.post('/:jobId/tasks', auth.required, JobsController.jobs_create_tasks)

router.post('/', auth.required, JobsController.jobs_create_job)

module.exports = router
