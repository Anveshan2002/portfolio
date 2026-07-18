import { HashRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";

export default function App() {
  return (
    <HashRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </AnimatePresence>
    </HashRouter>
  );
}
