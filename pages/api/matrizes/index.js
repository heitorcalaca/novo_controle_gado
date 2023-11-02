import connectMongo from "@/database/conn";
import {
  deleteMatrizes,
  getMatrizes,
  postMatrizes,
  putMatrizes,
} from "@/database/controller";

export default async function handler(req, res) {
  try {
    await connectMongo();
  } catch (error) {
    res.status(500).json({ error: "Error in the Connection" });
  }

  // type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getMatrizes(req, res);
      break;
    case "POST":
      postMatrizes(req, res);
      break;
    case "PUT":
      putMatrizes(req, res);
      break;
    case "DELETE":
      deleteMatrizes(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
