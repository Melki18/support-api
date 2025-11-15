const request = require("supertest");
const { start, stop } = require("../src/server");
const mongoose = require("mongoose");
const RequestType = require("../src/models/RequestType"); // utilisé pour le seed

let server;

beforeAll(async () => {
  jest.setTimeout(20000); // Timeout augmenté à 20s
  process.env.MONGO_URI = "mongodb://localhost:27017/support-api-test";
  server = await start();

  // Vider la collection avant les tests
  await RequestType.deleteMany({});

  // Seed initial avec un type actif
  await RequestType.create({
    code: "ACTIVE_TEST",
    name: "Active Test",
    description: "Description active",
    category: "test",
    isActive: true,
  });
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
    expect(res.body.code).toBe(payload.code);
  });

  test("GET /api/request-types renvoie un tableau", async () => {
    const res = await request(server).get("/api/request-types");
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /api/request-types ne renvoie que les types actifs", async () => {
    // Ajouter un type inactif
    await RequestType.create({
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
});
