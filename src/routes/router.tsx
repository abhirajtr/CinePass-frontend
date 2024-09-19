import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from "../Home";
import ErrorPage from "../ErrorPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<UserLayout />} >
                <Route path="/" element={ <Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </>

    )
)

export default router;