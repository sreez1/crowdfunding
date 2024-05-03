import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserROuter as Router} from "react-router-dom";
import {ChainId, ThirdwebProvider} from "@thirdweb-dev/react"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <ThirdwebProvider desiredChainId={ChainId.Sepolia}>
        <Router>
            <App/>
        </Router>
    </ThirdwebProvider>

)

