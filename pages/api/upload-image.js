// Absolute imports
import formidable from "formidable-serverless";

// Relative imports
import uploadFile from "lib/helpers/s3";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      const form = formidable();
      let url;

      form.parse(req, async (err, fields, files) => {
        try {
          const result = await uploadFile(files.image);
          url = result.Location;
        } catch (err) {
          console.log(err);
        }

        res.status(200).send({ url });
      });

      res.status(200);
      break;
  }
}
