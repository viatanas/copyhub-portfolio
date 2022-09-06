// Relative imports
import dbConnect from "lib/db/dbConnect";
import User from "models/User";
import Project from "models/Project";

export default async function handler(req, res) {
  await dbConnect();
  let project;

  const { method, query, body } = req;
  const { projectId } = query;

  switch (method) {
    case "GET":
      project = await Project.findById(projectId).populate("user");

      res.status(200).send({
        error: false,
        message: "Project retrieved successfully!",
        data: { project },
      });

      break;

    case "PUT":
      project = await Project.findById(projectId);

      // Update the project
      project.title = body.title;
      project.client = body.client;
      project.industry = body.industry;
      project.contentType = body.contentType;
      project.brief = body.brief;
      project.images = body.images;
      project.page = body.page;

      project = await project.save();

      res
        .status(200)
        .send({ error: false, message: "Post updated!", data: { project } });
      break;

    case "DELETE":
      // Delete project
      const deletedProject = await Project.findByIdAndDelete(projectId);

      // Delete project from user
      const user = await User.findById(deletedProject.user);
      user.projects.pull(deletedProject);
      await user.save();

      res
        .status(200)
        .send({ error: false, message: "Project deleted.", data: {} });
  }
}
