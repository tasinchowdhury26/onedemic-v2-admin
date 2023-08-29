import startAdminDB from "@/utils/adminDB";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method not allowed
  }

  const { username } = req.query;

  try {
    // Connect to the onedemic_v2_admins database
    const client = await startAdminDB();
    console.log(`Database connected from getAdmin api route`);
    const db = client.db();
    const adminData = await db.collection("admins").findOne({ username });
    console.log(adminData);

    if (adminData) {
      return res.status(200).json(adminData);
    } else {
      return res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
