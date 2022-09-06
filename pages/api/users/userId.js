// Relative imports
import dbConnect from "lib/db/dbConnect";
import User from "models/User";

export default async function handler(req, res) {
  await dbConnect();

  const { method, query, body } = req;
  let user;

  switch (method) {
    case "GET":
      // Retrieve the user document based on the provided query.

      if (query.slug) {
        user = await User.findOne({ username: query.slug }).populate({
          path: "projects",
          options: { sort: { publishedAt: -1 } },
        });

        res
          .status(200)
          .send({ error: false, message: "User found.", data: { user } });
        break;
      }

      if (query.firebaseId) {
        user = await User.findOne({ firebaseId: query.firebaseId }).populate(
          "projects"
        );
        res
          .status(200)
          .send({ error: false, message: "User found.", data: { user } });
        break;
      }

    case "PUT":
      // Retrieve the user document
      user = await User.findOne({ firebaseId: query.firebaseId });

      // Check if this username exists

      if (body.username !== user.username) {
        const usernameExists = await User.findOne({ username: body.username });

        if (usernameExists) {
          // Respond to the client with the updated user document
          res.status(200).send({
            error: true,
            message: "This username already exists. Please choose another one.",
            data: null,
          });

          return;
        }
      }

      // Save the rest of the fields to the user document
      user.username = body.username;
      user.name = body.name;
      user.location = body.location;
      user.header = body.header;
      user.bio = body.bio;
      user.email = body.email;
      user.twitter = body.twitter;
      user.linkedin = body.linkedin;
      user.services = body.services;
      user.clients = body.clients;
      user.profilePicture = body.profilePicture;
      user.theme = body.theme;

      user = await user.save();
      console.log(user);

      // Responsd to the client with the updated user document
      res.status(200).send({
        error: false,
        message: "User document updated.",
        data: { user },
      });

      break;
  }
}
