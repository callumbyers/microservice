const request = require("supertest");
const { app } = require("../app");

describe("default route", () => {
  it("should work", async () => {
    const res = await request(app.callback()).get("/");
    expect(res.text).toBe("hello world");
  });
});

describe("CREATE URL POST", () => {
  it("should return okay", async () => {
    const res = await request(app.callback())
      .post("/file")
      .send(
        JSON.stringify({
          fileName: "test.jpg",
        })
      )
      .set("Accept", "application/json");
    expect(res.text).toBe("OKAY");
    expect(res.status).toBe(200);
  });
});
