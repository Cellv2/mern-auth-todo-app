import supertest from "supertest";
import app from "../../../app";

const request = supertest(app);

describe("GET /users/addUser", () => {
    it("should return 200 OK", async (done) => {
        const res = await request.get("/api/users/addUser");
        expect(res.status).toBe(200);

        done();
    });

    it("should respond with json", async (done) => {
        const res = await request.get("/api/users/addUser");
        expect(res.header["content-type"]).toContain("application/json");

        done();
    });
});
