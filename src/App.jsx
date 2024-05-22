import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdventureBook } from "./AdventureBook";
import { ThemeProvider } from "./ThemeProvider";
// import "@pixi/events";
// Dirty hack to get pixi events because the above import doesn't work for some reason
import * as PIXI from 'pixi.js';

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
