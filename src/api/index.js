import { useCallback, useContext } from "react";
import { IssuesContext } from "../app-context";

export const filters = {
  all: "all",
  open: "open",
  closed: "closed",
  pullRequests: "pullRequests",
};

const getIssuesUrl = (repoName, { state } = { state: filters.all }) =>
  `https://api.github.com/repos/${repoName}/issues?state=${state}&per_page=100`;

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

export function useFetchIssues() {
  const { setIsLoading, setIsError, setIssues, setRepoUrl } =
    useContext(IssuesContext);

  const fetchIssues = useCallback(
    (searchInput, { state } = { state: filters.all }) => {
      const executeFetch = async (searchInput, { state }) => {
        try {
          if (state === filters.pullRequests) {
            state = filters.all;
          }

          const { orgName, repoName } = searchInputParser(searchInput);

          const repo = `${orgName}/${repoName}`;

          setIsLoading(true);
          setIsError(false);

          const res = await fetch(getIssuesUrl(repo, { state }));

          const json = await res.json();

          if (json.message) {
            throw new Error(json.message);
          }

          setRepoUrl(`https://github.com/${repo}`);
          setIssues(json);
          setIsLoading(false);
          setIsError(false);
        } catch (e) {
          console.error(e);

          setIsError(true);
          setIsLoading(false);
          setRepoUrl(``);
          setIssues(null);
        }
      };

      executeFetch(searchInput, { state });
    },
    [setIssues, setRepoUrl, setIsError, setIsLoading]
  );

  return { fetchIssues };
}
