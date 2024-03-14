import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Layout from "./pages/Layout";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ScrollToHashElement from "./components/ScrollToHashElement";
import AddHotel from "./pages/AddHotel";
import { ManageHotelFormContextProvider } from "./contexts/ManageHotelFormContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";

function App() {
  const authContext = useContext(AuthContext);
  const isSignedIn = authContext?.isSignedIn;

  return (
    <>
      <BrowserRouter>
        <ManageHotelFormContextProvider>
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
            <Route
              path="/search"
              element={
                <Layout>
                  <Search />
                </Layout>
              }
            />
            {isSignedIn && (
              <>
                <Route
                  path="/add-hotel"
                  element={
                    <Layout>
                      <AddHotel />
                    </Layout>
                  }
                />
                <Route
                  path="/my-hotels"
                  element={
                    <Layout>
                      <MyHotels />
                    </Layout>
                  }
                />
                <Route
                  path="/edit-hotel/:hotelId"
                  element={
                    <Layout>
                      <EditHotel />
                    </Layout>
                  }
                />
              </>
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ManageHotelFormContextProvider>
        <ScrollToHashElement />
      </BrowserRouter>
    </>
  );
}

export default App;
