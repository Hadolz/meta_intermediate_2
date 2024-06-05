import Cards from "./components/Cards";
import NavBar from "./components/shared/NavBar";
import { configureWeb3Modal } from "./connection";

configureWeb3Modal();

export default function App() {
  return (
    <div>
      <NavBar />
      <Cards />
    </div>
  );
}
