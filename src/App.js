import React from "react";

import Routes from "./routes";
import ErrorBoundary from "./ErrorBoundary";

function App() {
    return (
        <div>
            <ErrorBoundary>
                <Routes />
            </ErrorBoundary>
        </div>
    );
}

export default App;
