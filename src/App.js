import { createContext, useReducer } from "react";
import { ErrorBoundary } from "./components";
import Issues from "./pages/issues";
import Search from "./pages/search";

export const IssuesContext = createContext();

const initialState = {
  issues: null, // null = search page, [] = no issues, [...] = issues view
};

const actions = {
  SET_ISSUES: "SET_ISSUES",
};

function reducer(state, action) {
  switch (action.type) {
    case actions.SET_ISSUES:
      return {
        issues: [...action.issues],
      };
    default:
      return state;
  }
}

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    issues: state.issues,
    setIssues: (issues) => {
      dispatch({ type: actions.SET_ISSUES, issues });
    },
  };

  return (
    <IssuesContext.Provider value={value}>{children}</IssuesContext.Provider>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Provider>
        <Search />
        <Issues />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
