const getIssuesUrl = (repoName) =>
  `https://api.github.com/repos/${repoName}/issues`;

export const searchInputParser = (searchInput) => {
  try {
    if (!searchInput.startsWith("http")) {
      searchInput = `https://${searchInput}`;
    }

    let { pathname, hostname } = new URL(searchInput);

    if (!hostname.endsWith(".com")) {
      const fixedUrl = new URL(
        searchInput.replace("https://", ""),
        "https://github.com"
      );

      pathname = fixedUrl.pathname;
    }

    const orgName = pathname.split("/")[1];
    const repoName = pathname.split("/")[2];

    if (orgName === undefined || repoName === undefined) {
      throw new Error("Parsing error");
    }

    return { orgName, repoName };
  } catch (e) {
    throw new Error("Parsing error");
  }
};

export const fetchAllIssues = async (searchInput) => {
  try {
    const { orgName, repoName } = searchInputParser(searchInput);

    const repo = `${orgName}/${repoName}`;

    const res = await fetch(getIssuesUrl(repo));

    const json = await res.json();

    return { issues: json, repoUrl: `https://github.com/${repo}` };
  } catch (e) {
    throw new Error("Fetching error", e);
  }
};
