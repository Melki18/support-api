const request = require("supertest");
const { start, stop } = require("../src/server");
const mongoose = require("mongoose");
// const RequestType = require("../src/models/RequestType"); // Non utilisé pour l'instant

let server;

beforeAll(async () => {
  process.env.MONGO_URI = "mongodb://localhost:27017/support-api-test";
  server = await start();
  // / je vider la collection RequestType pour éviter les doublons
  await mongoose.connection.db.collection("requesttypes").deleteMany({});
});

afterAll(async () => {
  await stop();
  await mongoose.connection.close();
});

test("GET /health", async () => {
  const res = await request(server).get("/health");
  expect(res.status).toBe(200);
  expect(res.body.status).toBe("ok");
});

describe("RequestTypes API", () => {
  test("POST /api/request-types crée un type", async () => {
    const payload = {
      code: "TEST_1",
      name: "Test",
      description: "desc",
      category: "demo",
    };
    const res = await request(server).post("/api/request-types").send(payload);

    if (res.status !== 201) {
      console.log("Erreur POST /api/request-types:", res.body);
    }

    expect(res.status).toBe(201);
  });

  test("GET /api/request-types renvoie un tableau", async () => {
    const res = await request(server).get("/api/request-types");
    expect(Array.isArray(res.body)).toBe(true);
  });
});
test("GET /api/request-types ne renvoie que les types actifs", async () => {
  await mongoose.connection.db.collection("requesttypes").insertOne({
    code: "INACTIVE_TEST",
    name: "Inactive",
    description: "desc inactive",
    category: "test",
    isActive: false,
  });

  const res = await request(server).get("/api/request-types");

  const inactive = res.body.find((item) => item.code === "INACTIVE_TEST");

  expect(inactive).toBeUndefined();
});