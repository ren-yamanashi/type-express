import { Handlers, HttpRequestMethod } from "src/types";
import { MockRouter } from "../../../__mocks__/router/route";

test("Router", async () => {
  let router: MockRouter;

  beforeEach(() => {
    router = new MockRouter();
  });

  afterEach(() => {
    router = new MockRouter();
  });

  await test("registerRouter should store route information", () => {
    const path = "/test";
    const handlers: Handlers<any> = (req, res) => {
      res.send("Test");
    };
    const method: HttpRequestMethod = "GET";

    const route = router.getRouteRegistry().get(path);
    expect(route).toBeDefined();
    expect(route?.handlers).toEqual(handlers);
    expect(route?.method).toEqual(method);
  });
});
