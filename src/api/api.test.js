import { searchInputParser } from ".";

describe("searchInputParser", () => {
  it("parses a normal https:// link", () => {
    const searchInput = "https://github.com/facebook/react";

    const { orgName, repoName } = searchInputParser(searchInput);

    expect(orgName).toEqual("facebook");
    expect(repoName).toEqual("react");
  });

  it("parses a repo name", () => {
    const searchInput = "facebook/react";

    const { orgName, repoName } = searchInputParser(searchInput);

    expect(orgName).toEqual("facebook");
    expect(repoName).toEqual("react");
  });

  it("parses a no https:// link", () => {
    const searchInput = "github.com/facebook/react";

    const { orgName, repoName } = searchInputParser(searchInput);

    expect(orgName).toEqual("facebook");
    expect(repoName).toEqual("react");
  });

  it("parses repo name with extra params", () => {
    const searchInput = "https://github.com/facebook/react/issues";

    const { orgName, repoName } = searchInputParser(searchInput);

    expect(orgName).toEqual("facebook");
    expect(repoName).toEqual("react");
  });

  it("throw error for gibberish", () => {
    const searchInput = "foobar";

    expect(() => {
      searchInputParser(searchInput);
    }).toThrow();
  });
});
