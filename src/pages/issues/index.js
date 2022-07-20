import { useContext, useState } from "react";
import styled from "styled-components";
import { useFetchIssues, filters } from "../../api";
import { Issue, Page } from "../../components";
import { IssuesContext } from "../../context";
import {
  GITHUB_ISSUE_VIEWER,
  NO_ISSUES,
  ALL_ISSUES,
  OPEN_ISSUES,
  CLOSED_ISSUES,
  PULL_REQUESTS,
} from "../../copy";

const filterButtons = [ALL_ISSUES, OPEN_ISSUES, CLOSED_ISSUES, PULL_REQUESTS];
const filterMap = {
  [ALL_ISSUES]: filters.all,
  [OPEN_ISSUES]: filters.open,
  [CLOSED_ISSUES]: filters.closed,
  [PULL_REQUESTS]: filters.pullRequests,
};

function Issues() {
  const { issues, repoUrl, setIssues, setRepoUrl, isLoading } =
    useContext(IssuesContext);
  const [activeFilter, setActiveFilter] = useState(filters.all);
  const { fetchIssues } = useFetchIssues();

  const handleClose = () => {
    setIssues(null);
    setRepoUrl("");
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);

    fetchIssues(repoUrl, { state: filter });
  };

  return (
    <Page>
      <Header>
        <Heading>{GITHUB_ISSUE_VIEWER}</Heading>
        <Fill />
        <URL>{repoUrl}</URL>
      </Header>
      <Filter>
        {filterButtons.map((filter) => (
          <Button
            key={filter}
            onClick={() => handleFilter(filterMap[filter])}
            isActive={activeFilter === filterMap[filter]}
          >
            {filter}
          </Button>
        ))}
        <Fill />
        <Close onClick={handleClose} />
      </Filter>
      {issues.length === 0 ? (
        <p>{NO_ISSUES}</p>
      ) : (
        <IssuesGrid isLoading={isLoading}>
          {issues.map((issue, idx) => {
            let shouldRender = true;
            if (activeFilter === filters.pullRequests) {
              shouldRender = "pull_request" in issue;
            }

            if (!shouldRender) {
              return null;
            }

            return (
              <Issue
                key={`issue-${idx}`}
                description={issue.body}
                title={issue.title}
                tags={issue.labels}
                isPullRequest={"pull_request" in issue}
                isClosed={issue["closed_at"] && issue["closed_at"] !== null}
              />
            );
          })}
        </IssuesGrid>
      )}
    </Page>
  );
}

const Header = styled.section`
  display: flex;
  align-items: baseline;
  border: 2px black solid;
  margin-bottom: 20px;
`;

const Button = styled.button`
  font-size: 24px;
  background: none !important;
  border: none;
  padding: 0 !important;

  text-decoration: ${({ isActive }) => (isActive ? "underline" : "none")};
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Close = styled.button`
  display: flex;
  background: none !important;
  border: none;
  padding: 0 !important;
  cursor: pointer;
  width: 60px;
  height: 60px;
  position: relative;

  ::after {
    content: "";
    height: 60px;
    border-left: 2px solid black;
    position: absolute;
    transform: rotate(45deg);
    left: 28px;
  }

  ::before {
    content: "";
    height: 60px;
    border-left: 2px solid black;
    position: absolute;
    transform: rotate(-45deg);
    left: 28px;
  }
`;

const Filter = styled.div`
  padding-left: 40px;
  margin-bottom: 20px;
  display: flex;
  gap: 46px;

  @media (max-width: 768px) {
    padding-left: 8px;
    gap: 12px;
  }
`;

const Fill = styled.div`
  display: flex;
  flex: 1;
`;

const Heading = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin-left: 40px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-left: 20px;
  }
`;

const URL = styled.div`
  font-size: 24px;
  margin-right: 40px;

  @media (max-width: 768px) {
    font-size: 12px;
    margin-right: 20px;
  }
`;

const IssuesGrid = styled.section`
  display: flex;
  opacity: ${({ isLoading }) => (isLoading ? "50%" : "unset")};
  flex-wrap: wrap;
  gap: 24px;
  width: 100%;
  justify-content: space-evenly;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    gap: 18px;
  }
`;

export default Issues;
