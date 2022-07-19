import { useContext, useState } from "react";
import styled from "styled-components";
import { fetchAllIssues } from "../../api";
import { Page } from "../../components";
import { IssuesContext } from "../../Context";
import { GITHUB_ISSUE_VIEWER, PASTE_LINK, SEARCH_ERROR } from "../../copy";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const { setIssues, setRepoUrl } = useContext(IssuesContext);

  const [isError, setIsError] = useState(false);

  const search = async () => {
    try {
      const { issues, repoUrl } = await fetchAllIssues(searchInput);

      if (issues.message) {
        throw new Error(issues.message);
      }

      setRepoUrl(repoUrl);
      setIssues(issues);
      setIsError(false);
    } catch (e) {
      console.error(e);

      setIsError(true);
      setIssues(null);
      setRepoUrl("");
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
    <Page>
      <Center>
        <IssueViewerTitle>{GITHUB_ISSUE_VIEWER}</IssueViewerTitle>

        <Input
          type="text"
          value={searchInput}
          onChange={handleChange}
          onKeyDown={onKeyPress}
          placeholder={PASTE_LINK}
        />

        {isError ? <ErrorText>{SEARCH_ERROR}</ErrorText> : null}
      </Center>
    </Page>
  );
}

const Input = styled.input`
  border: 2px black solid;
  padding: 14px;
  border-radius: 8px;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 40%;
  max-width: 500px;
  height: 100vh;
  padding-top: 12%;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const IssueViewerTitle = styled.h1`
  align-self: center;
  font-size: 32px;
`;
const ErrorText = styled.span`
  color: red;
`;

export default Search;
