import { MongoClient, ServerApiVersion } from "mongodb";

const main_db_url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.8xde0iy.mongodb.net/onedemic_v2_test_db?retryWrites=true&w=majority`;
const startDB = async () => {
  const client = new MongoClient(main_db_url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();
    console.log(`Database connected successfully!`);
    return client;
  } catch (error) {
    console.log(`Failed to connect database : `, error);
  }
};

export default startDB;
