import NavBar from "./components/NavBar/NavBar";
import "./App.css"
import HeaderImg from "./components/HeaderImg/HeaderImg";
const dotenv = require("dotenv")
dotenv.config()

function App() {
  return (
    <div className="App">
      <NavBar />
      <HeaderImg />
    </div>
  );
}

export default App;
