import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ScrollToHashElement from "./components/ScrollToHashElement";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <p>Page placeholder</p>
              </Layout>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Layout>
                <SignUp />
              </Layout>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Layout>
                <SignIn />
              </Layout>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ScrollToHashElement />
      </BrowserRouter>
    </>
  );
}

export default App;
