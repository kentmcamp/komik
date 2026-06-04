import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import SeriesPage from "./pages/SeriesPage.tsx";
import ReaderPage from "./pages/ReaderPage.tsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/series/:slug" element={<SeriesPage />} />
        <Route path="/reader/:seriesSlug/:issueNumber" element={<ReaderPage />} />
      </Routes>
    </>
  )
}

export default App;
