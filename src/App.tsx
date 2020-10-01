import React from "react";
import AppRouters from "./utils/routers/AppRouters";
import { Helmet } from "react-helmet";
import { GeneralUIProvider } from "./utils/providers/generalStore";
import { TodosProvider } from "./utils/providers/todoStore";

const App: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Helmet>
      <div className="App">
        <TodosProvider todos={[]}>
          <GeneralUIProvider>
            <AppRouters></AppRouters>
          </GeneralUIProvider>
        </TodosProvider>
      </div>
    </>
  );
};

export default App;
