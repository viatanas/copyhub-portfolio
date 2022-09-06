// Relative imports
import dbConnect from "lib/db/dbConnect";
import User from "models/User";
import Project from "models/Project";

export default async function handler(req, res) {
  await dbConnect();
  let user;

  const { method, query, body } = req;
  const { firebaseId } = query;
  const { title, client, industry, contentType, brief, images, page } = body;

  switch (method) {
    case "POST":
      user = await User.findOne({ firebaseId });

      let project = new Project({
        user: user._id,
        title,
        client,
        industry,
        contentType,
        brief,
        images,
        page,
      });
      project = await project.save();

      // Save to the user
      user.projects.push(project._id);
      await user.save();

      res
        .status(200)
        .send({ error: false, message: "User saved.", data: { project } });

      break;
  }
}
