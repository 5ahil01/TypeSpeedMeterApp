import React from "react";
import DisplayContnet from "./Components/DisplayContnet";
import { TypeContextProvider } from "./Store/typeContext";

const App = () => {
  return (
    <TypeContextProvider>
      <DisplayContnet />
    </TypeContextProvider>
  );
};

export default App;
