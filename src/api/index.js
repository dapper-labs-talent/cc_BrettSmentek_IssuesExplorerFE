const getIssuesUrl = (repoName) =>
  `https://api.github.com/repos/${repoName}/issues`;

export const fetchAllIssues = async (repoName) => {
  const res = await fetch(getIssuesUrl(repoName));

  const json = await res.json();

  return json;
};
