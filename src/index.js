// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./Components/App";

// ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./Components/App";
import { disableReactDevTools} from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);