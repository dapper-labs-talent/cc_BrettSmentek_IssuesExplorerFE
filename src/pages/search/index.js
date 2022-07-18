import { useContext, useState } from "react";
import styled from "styled-components";
import { fetchAllIssues } from "../../api";
import { GITHUB_ISSUE_VIEWER, SEARCH_ERROR } from "../../copy";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const { setIssues } = useContext(IssuesContext);

  const [isError, setIsError] = useState(false);

  const search = () => {
    try {
      const issues = fetchAllIssues(searchInput);
    } catch (e) {
      console.error(e);

      setIsError(true);
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
      {isError ? <Error>{SEARCH_ERROR}</Error> : null}
    </div>
  );
}
const IssueViewerTitle = styled.h1``;
const Error = styled.span`
  color: red;
`;

export default Search;
