import React from "react";
import Paths from "./routes/Paths";

const App = () => {
  return (
    <div className="w-full h-dvh bg-slate-100 flex justify-center items-center">
      <div className="w-1/3">
          <Paths />
      </div>
    </div>
  );
};

export default App;
