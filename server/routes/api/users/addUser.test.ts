import supertest from "supertest";
import app from "../../../app";

const request = supertest(app);

it("should return 200 OK", async (done) => {
    const res = await request.get("/users/addUser");
    expect(res.status).toBe(200);

    done();
});
