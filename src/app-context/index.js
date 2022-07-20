import { createContext, useReducer } from "react";

export const IssuesContext = createContext();

const initialState = {
  issues: null, // null = search page, [] = no issues, [...] = issues view
  repoUrl: "",
  isLoading: false,
  isError: false,
};

const actions = {
  SET_ISSUES: "SET_ISSUES",
  SET_REPO: "SET_REPO",
  SET_IS_LOADING: "SET_IS_LOADING",
  SET_IS_ERROR: "SET_IS_ERROR",
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
    case actions.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case actions.SET_IS_ERROR:
      return {
        ...state,
        isError: action.isError,
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
    isLoading: state.isLoading,
    isError: state.isError,
    setIssues: (issues) => {
      dispatch({ type: actions.SET_ISSUES, issues });
    },
    setRepoUrl: (repoUrl) => {
      dispatch({ type: actions.SET_REPO, repoUrl });
    },
    setIsLoading: (isLoading) => {
      dispatch({ type: actions.SET_IS_LOADING, isLoading });
    },
    setIsError: (isError) => {
      dispatch({ type: actions.SET_IS_ERROR, isError });
    },
  };

  return (
    <IssuesContext.Provider value={value}>{children}</IssuesContext.Provider>
  );
}
