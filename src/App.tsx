import "./App.css";
import VendingMachine from "./components/VendingMachine";
import ItemProvider from "./context/ItemContext";

function App() {
  return (
    <div className="App">
      <ItemProvider>
        <VendingMachine />
      </ItemProvider>
    </div>
  );
}

export default App;
