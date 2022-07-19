import { useContext, useState } from "react";
import styled from "styled-components";
import { Issue, Page } from "../../components";
import { IssuesContext } from "../../Context";
import { GITHUB_ISSUE_VIEWER, NO_ISSUES, ALL_ISSUES } from "../../copy";

function Issues() {
  const { issues, repoUrl, setIssues, setRepoUrl } = useContext(IssuesContext);

  const handleClose = () => {
    setIssues(null);
    setRepoUrl("");
  };

  return (
    <Page>
      <Header>
        <Heading>{GITHUB_ISSUE_VIEWER}</Heading>
        <Fill />
        <URL>{repoUrl}</URL>
      </Header>
      <Filter>
        <Button>{ALL_ISSUES}</Button>
        <Fill />
        <Close onClick={handleClose} />
      </Filter>
      {issues.length === 0 ? (
        <p>{NO_ISSUES}</p>
      ) : (
        <IssuesGrid>
          {issues.map((issue, idx) => {
            return (
              <Issue
                key={`issue-${idx}`}
                description={issue.body}
                title={issue.title}
                tags={issue.labels}
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

  text-decoration: underline;
  cursor: pointer;
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
