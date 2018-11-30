const Job = require('../models/job')

const jobs = [
  {
    title: 'Toughjoyfax',
    client: '5be356a50c507137940fdc10',
    tasks: [
      {
        comments: 'Working on it',
        start_time: '2018-10-12 09:00',
        end_time: '2018-10-12 11:30',
        isCompleted: true,
        user: '5be355ef7d5ed6270c4d9ca0'
      },
      {
        comments: 'Working on it some more',
        start_time: '2018-10-12 12:00',
        end_time: '2018-10-12 13:30',
        isCompleted: false,
        user: '5be355ef7d5ed6270c4d9ca0'
      }
    ]
  },
  {
    title: 'Keylex',
    client: '5be356a50c507137940fdc0d',
    tasks: [
      {
        comments: 'Working on it',
        start_time: '2018-10-13 11:00',
        end_time: '2018-10-13 12:30',
        isCompleted: true,
        user: '5be3559e7d5ed6270c4d9c9f'
      },
      {
        comments: 'Working on it some more',
        start_time: '2018-10-13 13:00',
        end_time: '2018-10-13 15:30',
        isCompleted: false,
        user: '5be3559e7d5ed6270c4d9c9f'
      }
    ]
  }
]

const jobSeeder = () => {
  Job.remove({}, err => {
    if (err) {
      console.log(err)
    } else {
      console.log('removed existing jobs')
    }
  })
  jobs.forEach(job => {
    Job.create(job, (err, job) => {
      if (err) {
        console.log(err)
      } else {
        job.save()
        console.log('added new job')
      }
    })
  })
}

module.exports = jobSeeder
