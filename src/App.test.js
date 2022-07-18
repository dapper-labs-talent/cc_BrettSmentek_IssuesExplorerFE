import { render, screen } from "@testing-library/react";
import App from "./App";
import { GITHUB_ISSUE_VIEWER } from "./copy";

test("renders learn react link", () => {
  render(<App />);
  const IssueViewerTitle = screen.getByText(GITHUB_ISSUE_VIEWER);
  expect(IssueViewerTitle).toBeInTheDocument();
});
