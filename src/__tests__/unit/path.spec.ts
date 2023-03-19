import { getParam, matchPathWithUrl } from "../../modules/path";

describe("matchPathWithUrl", () => {
  test("/user", async () => {
    expect(matchPathWithUrl("/user", "/user")).toBe(true);
    expect(matchPathWithUrl("/user/", "/user/")).toBe(true);
    expect(matchPathWithUrl("/user/", "/user")).toBe(true);
  });
  test("/user/:id", async () => {
    expect(matchPathWithUrl("/user/:id", "/user/2")).toBe(true);
    expect(matchPathWithUrl("/user/:id", "/user/books/sample-book-id")).toBe(
      false
    );
    expect(matchPathWithUrl("/user/:id", "/user/books/sample-book-id")).toBe(
      false
    );
  });
  test("/user/:id/books/:bookId `true`", async () => {
    expect(
      matchPathWithUrl(
        "/user/:id/books/:bookId",
        "/user/123/books/sample-book-id"
      )
    ).toBe(true);
    expect(
      matchPathWithUrl("/user/:id/books/:bookId", "/user/books/sample-book-id")
    ).toBe(false);
  });
});

describe("getParam", () => {
  test("/user", async () => {
    expect(getParam("/user", "/user")).toEqual(null);
  });
  test("/user/:id", async () => {
    expect(getParam("/user/:id", "/user/2")).toEqual({ id: "2" });
    expect(getParam("/user/:id", "/user/sample-user-id")).toEqual({
      id: "sample-user-id",
    });
  });
  test("/user/:id/books/:bookId `true`", async () => {
    expect(
      getParam("/user/:id/books/:bookId", "/user/123/books/sample-book-id")
    ).toEqual({ id: "123", bookId: "sample-book-id" });
    expect(getParam("/user/:id/books/:bookId", "/user/123/books/1000")).toEqual(
      {
        id: "123",
        bookId: "1000",
      }
    );
  });
});
