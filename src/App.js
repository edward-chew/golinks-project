import DataTable from "./DataTable";
import "./styles/App.css";

function App() {
  return (
    <div className="m-auto w-8/12 py-20 font-sans">
      <h1 className="mb-10 font-bold text-7xl text-center">
        GitHub Stats Lookup
      </h1>
      <DataTable />
    </div>
  );
}

export default App;
