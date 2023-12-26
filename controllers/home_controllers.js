const Project = require('../models/project');

module.exports.home = async function (req, res) {
  try {
    // Fetch projects from the database, sorted by createdAt in descending order
    let projects = await Project.find({}).sort('-createdAt');

    // Render the 'home' view with the fetched projects
    return res.render('home', {
      title: 'Issue Tracker',
      projects,
    });
  } catch (err) {
    // Handle errors by logging and optionally responding with an error page
    console.log('Error', err);
    return res.status(500).send('Internal Server Error');
  }
};
