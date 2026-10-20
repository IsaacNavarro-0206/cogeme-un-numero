import { createBrowserRouter } from "react-router-dom";
import Layout from "@/Layout";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/Signup";
import CreateRafflePage from "@/pages/CreateRaffle";
import EditRafflePage from "@/pages/EditRaffle";
import MyRaffles from "@/pages/MyRaffles";
import MyRaffle from "@/pages/MyRaffle";
import ProfilePage from "@/pages/Profile";
import ChooseNumber from "@/pages/ChooseNumber";
import { ProtectedRoute } from "@/utils/protectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
        element: (
          <ProtectedRoute>
            <LoginPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <ProtectedRoute>
            <SignupPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "choose-number/:raffleId/:userId",
        element: <ChooseNumber />,
      },
      {
        path: "create-raffle",
        element: (
          <ProtectedRoute>
            <CreateRafflePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-raffle/:id",
        element: (
          <ProtectedRoute>
            <EditRafflePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-raffles",
        element: (
          <ProtectedRoute>
            <MyRaffles />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-raffle/:id",
        element: (
          <ProtectedRoute>
            <MyRaffle />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/:id",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
