import { useContext, useState } from "react";
import styled from "styled-components";
import { useFetchIssues } from "../../api";
import { Page } from "../../components";
import { IssuesContext } from "../../app-context";
import SearchIcon from "../../icons/search.svg";

import {
  GITHUB_ISSUE_VIEWER,
  LOADING,
  PASTE_LINK,
  SEARCH_ERROR,
} from "../../copy";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const { isLoading, isError } = useContext(IssuesContext);

  const { fetchIssues } = useFetchIssues();

  const search = () => {
    fetchIssues(searchInput);
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
        {isLoading ? <Loading>{LOADING}</Loading> : null}
        {isError ? <ErrorText>{SEARCH_ERROR}</ErrorText> : null}
      </Center>
    </Page>
  );
}

const Input = styled.input`
  border: 2px black solid;
  padding: 14px 14px 14px 40px;
  border-radius: 8px;
  background: transparent url(${SearchIcon}) no-repeat 13px center;
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

const Loading = styled.span``;

export default Search;
