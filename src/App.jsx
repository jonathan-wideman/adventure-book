import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdventureBook } from "./AdventureBook";
import { ThemeProvider } from "./ThemeProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="adventure-book-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AdventureBook />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
