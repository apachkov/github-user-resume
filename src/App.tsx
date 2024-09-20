import { Routes, Route, Link } from "react-router-dom";
import NavigationLayout from "./components/layouts/NavigationLayout";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import NoMatch from "./pages/NoMatch";

export default function App() {
  return (
    <div className={'container'}>
      <h1>GitHub resume Example</h1>

      <Routes>
        <Route path="/" element={<NavigationLayout />}>
          <Route index element={<Home />} />
          <Route path=":username" element={<Resume />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}


