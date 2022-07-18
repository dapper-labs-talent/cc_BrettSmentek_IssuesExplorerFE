import { useContext, useState } from "react";
import styled from "styled-components";
import { fetchAllIssues } from "../../api";
import { IssuesContext } from "../../App";
import { GITHUB_ISSUE_VIEWER, SEARCH_ERROR } from "../../copy";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const { setIssues } = useContext(IssuesContext);

  const [isError, setIsError] = useState(false);

  const search = async () => {
    try {
      const issues = await fetchAllIssues(searchInput);

      if (issues.message) {
        throw new Error(issues.message);
      }

      setIssues(issues);
      setIsError(false);
    } catch (e) {
      console.error(e);

      setIsError(true);
      setIssues(null);
    }
  };

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;

    setSearchInput(value);
  };

  const onKeyPress = (e) => {
    const { key } = e;

    if (key === "Enter") {
      search();
    }
  };

  return (
    <div>
      <IssueViewerTitle>{GITHUB_ISSUE_VIEWER}</IssueViewerTitle>
      <label>
        search:
        <input
          type="text"
          value={searchInput}
          onChange={handleChange}
          onKeyDown={onKeyPress}
        />
      </label>
      {isError ? <ErrorText>{SEARCH_ERROR}</ErrorText> : null}
    </div>
  );
}
const IssueViewerTitle = styled.h1``;
const ErrorText = styled.span`
  color: red;
`;

export default Search;
