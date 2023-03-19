import { matchPathWithUrl } from "../../modules/path";

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
      matchPathWithUrl("/user/:id/books/:bookId", "/user/123/books/sample-book-id")
    ).toBe(true);
    expect(
      matchPathWithUrl("/user/:id/books/:bookId", "/user/books/sample-book-id")
    ).toBe(false);
  });
});
