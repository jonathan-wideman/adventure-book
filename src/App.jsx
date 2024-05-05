import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdventureBook } from "./AdventureBook";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdventureBook />
    </QueryClientProvider>
  );
}

export default App;
