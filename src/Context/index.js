import { createContext, useReducer } from "react";

export const IssuesContext = createContext();

const initialState = {
  issues: null, // null = search page, [] = no issues, [...] = issues view
  repoUrl: "",
};

const actions = {
  SET_ISSUES: "SET_ISSUES",
  SET_REPO: "SET_REPO",
};

function reducer(state, action) {
  switch (action.type) {
    case actions.SET_ISSUES:
      return {
        ...state,
        issues: action.issues === null ? null : [...action.issues],
      };
    case actions.SET_REPO:
      return {
        ...state,
        repoUrl: action.repoUrl,
      };
    default:
      return state;
  }
}

export function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    issues: state.issues,
    repoUrl: state.repoUrl,
    setIssues: (issues) => {
      dispatch({ type: actions.SET_ISSUES, issues });
    },
    setRepoUrl: (repoUrl) => {
      dispatch({ type: actions.SET_REPO, repoUrl });
    },
  };

  return (
    <IssuesContext.Provider value={value}>{children}</IssuesContext.Provider>
  );
}
