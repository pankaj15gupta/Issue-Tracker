const Project = require('../models/project');
const Issue = require('../models/issue');

// Create a project for the user
module.exports.create = async function (req, res) {
  try {
    // Use destructuring to extract properties from req.body
    const { name, description, author } = req.body;

    // Create a new project
    await Project.create({
      name,
      description,
      author,
    });

    // Redirect back to the previous page
    return res.redirect('back');
  } catch (err) {
    console.error(err);
    return res.redirect('back');
  }
};

// Find a project and display it on the project page
module.exports.project = async function (req, res) {
  try {
    // Use destructuring to extract parameters from req.params
    const { id } = req.params;

    // Find the project by ID and populate its issues
    const project = await Project.findById(id).populate('issues');

    // Check if the project exists
    if (project) {
      // Render the 'project_page' view with the retrieved project
      return res.render('project_page', {
        title: 'Project Page',
        project,
      });
    }

    // Redirect back if the project does not exist
    return res.redirect('back');
  } catch (err) {
    console.error(err);
    return res.redirect('back');
  }
};

// Create an issue within a project
module.exports.createIssue = async function (req, res) {
  try {
    // Use destructuring to extract parameters from req.params and req.body
    const { id } = req.params;
    const { title, description, labels, author } = req.body;

    // Find the project by ID
    const project = await Project.findById(id);

    // Check if the project exists
    if (project) {
      // Create a new issue
      const issue = await Issue.create({
        title,
        description,
        labels,
        author,
      });

      // Push the new issue to the project's issues array
      project.issues.push(issue);

      // Add labels to the project's labels array
      if (Array.isArray(labels)) {
        labels.forEach((label) => {
          if (!project.labels.includes(label)) {
            project.labels.push(label);
          }
        });
      } else if (!project.labels.includes(labels)) {
        project.labels.push(labels);
      }

      // Save the updated project
      await project.save();

      // Redirect back to the previous page
      return res.redirect('back');
    } else {
      // Redirect back if the project does not exist
      return res.redirect('back');
    }
  } catch (err) {
    console.error(err);
    return res.redirect('back');
  }
};
