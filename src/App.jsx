import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";

function App() {
  return (
    <> <ul>
      <h1>Theme Creator</h1>

      <li className="color-container">
        {initialColors.map((color) => {
          return <Color key={color.id} color={color} />;
        })}
      </li>
      </ul>
    </>
  );
}
export default App;
