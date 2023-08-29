import { MongoClient, ServerApiVersion } from "mongodb";
const admin_db_url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.8xde0iy.mongodb.net/onedemic_v2_admins?retryWrites=true&w=majority`;

const startAdminDB = async () => {
  const client = new MongoClient(admin_db_url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();
    console.log(`Admin Database connected successfully!`);
    return client;
  } catch (error) {
    console.log(`Failed to connect Admin database : `, error);
  }
};

export default startAdminDB;
