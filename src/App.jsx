import Header from "./components/Header";
import Crawler from "./components/Crawler";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

export default function App({ mode, setMode }) {
  return (
    <>
      <Header mode={mode} setMode={setMode} />
      <Crawler />
      <Dashboard />
      <Footer />
    </>
  );
}
