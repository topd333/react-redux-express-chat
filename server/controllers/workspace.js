const Workspace = require('../models/workspace');

exports.getWorkspaces = function (req, res, next) {
  Workspace.find({})
    .sort('createdAt')
    .exec((err, workspaces) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      return res.status(200).json({ workspaces: workspaces });
    });
};

exports.createWorkspace = function (req, res, next) {
  // Check for registration errors
  const fullname = req.body.fullname;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // Return error if fullname not provided
  if (!fullname) {
    return res.status(422).send({ error: 'You must enter full name.' });
  }
  // Return error if name not provided
  if (!name) {
    return res.status(422).send({ error: 'You must enter display name.' });
  }
  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.' });
  }
  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  Workspace.findOne({'name': name}, (err, existWorkspace) => {
    if (err) { return next(err); }

    // If workspace is not unique, return error
    if (existWorkspace) {
      return res.status(422).send({ error: 'Display name is already in use.' });
    }

    const workspace = new Workspace({
      fullname,
      name,
      email,
      password,
    });

    workspace.save((err, workspace) => {
      if (err) { return next(err); }

      return res.status(200).json({ workspace: workspace });
    });
  });
};

exports.viewWorkspace = function (req, res, next) {
  const workspaceId = req.params.workspaceId;

  Workspace.findById(workspaceId, (err, workspace) => {
    if (err) {
      res.status(400).json({ error: 'No workspace could be found.' });
      return next(err);
    }

    return res.status(200).json({ workspace: workspace });
  });
};
