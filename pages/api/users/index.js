// Relative imports
import dbConnect from "lib/db/dbConnect";
import User from "models/User";
import getLargerGoogleImage from "lib/helpers/getLargerGoogleImage";

export default async function handler(req, res) {
  await dbConnect();

  const { method, body } = req;

  switch (method) {
    case "POST":
      let user = await User.findOne({ firebaseId: body.firebaseId });

      if (user) {
        res.status(200).send({
          error: false,
          message: "User already exists.",
          data: { user },
        });
        return;
      }

      const header =
        "Hey! Welcome to my online copywriting portfolio. I'm available for work.";
      const location = "Remote";

      user = new User({
        firebaseId: body.firebaseId,
        name: body.name,
        username: body.firebaseId,
        email: body.email,
        profilePicture: getLargerGoogleImage(body.profilePicture),
        header,
        location,
      });
      await user.save();

      res.status(201).send({
        error: false,
        message: "User has been saved successfully!",
        data: { user },
      });
      break;
  }
}
