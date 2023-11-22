import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import MyErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <MyErrorBoundary>
          <RouterProvider router={router} />
        </MyErrorBoundary>
      </Provider>
    </>
  );
}

export default App;
