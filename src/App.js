import { useContext } from "react";
import { ErrorBoundary } from "./components";
import { IssuesContext, StateProvider } from "./Context";
import Issues from "./pages/issues";
import Search from "./pages/search";

function SimpleRouter() {
  const { issues } = useContext(IssuesContext);
  return <>{issues === null ? <Search /> : <Issues />}</>;
}

function App() {
  return (
    <ErrorBoundary>
      <StateProvider>
        <SimpleRouter />
      </StateProvider>
    </ErrorBoundary>
  );
}

export default App;
