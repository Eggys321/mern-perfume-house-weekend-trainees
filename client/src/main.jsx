import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
// import App from './App.jsx'
import "./index.css";
import { CartProvider } from "./context/CartContext.jsx";
import { lazy, Suspense } from "react";
import Spinner from "react-bootstrap/Spinner";
const App = lazy(() => import("./App"));

// const App = lazy(
//   () =>
//     new Promise((resolve) => {
//       setTimeout(() => resolve(import("./App")), 60000); // 60000 ms = 1 minute
//     })
// );
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <Suspense
        fallback={
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="grow" variant="secondary" />
            <h5 className="pt-2"> Loading...</h5>
          </div>
        }
      >
        <App />
      </Suspense>
    </CartProvider>
  </StrictMode>
);
