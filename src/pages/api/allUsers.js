import startDB from "@/utils/db";

export default async function handler(req, res) {
  try {
    const client = await startDB();
    // console.log(`Database connected from users api route`);
    const db = client.db();
    const usersCollection = db.collection("users");

    if (req.method === "GET") {
      const users = await usersCollection.find({}).toArray();
      res.send({
        message: `Success`,
        statusCode: 200,
        data: users,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
