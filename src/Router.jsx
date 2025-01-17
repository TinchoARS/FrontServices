import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { NotFound } from "./components/NotFound";
import { ServicesList } from "./components/services/ServicesList";
import { ServiceDetails } from "./components/services/ServiceDetails";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { Home } from "./components/layout/Home";
import { RequestsList } from "./components/requests/RequestsList";
import { PostsList } from "./components/posts/PostsList";
import { Profile } from "./components/user/Profile";
import { ProtectedRoute } from "./security/ProtectedRouter";

export const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/",
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/services",
                children: [
                    {
                        index: true,
                        element: (
                            <ProtectedRoute>
                                <ServicesList />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: ":idService",
                        element: <ServiceDetails />
                    },
                    {
                        path: "addService",
                        // element: <AddServices />
                    }
                ],
            },
            {
                path: "/requests",
                children: [
                    {
                        index: true,
                        element: (
                            <ProtectedRoute>
                                <RequestsList />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: ":idPost",
                         //element: <RequestsDetails />
                    },
                    {
                        path: "addRequest",
                        // element: <AddRequests />
                    }
                ],
            },
            {
                path: "/posts",
                children: [
                    {
                        index: true,
                        element: (
                            <ProtectedRoute>
                                <PostsList />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: ":idPost",
                        // element: <PostsDetails />
                    }
                ],
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "*",
                element: <NotFound />
            },
            {
                path: "/profile",
                children: [
                    {
                        index: true,
                        element: (
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "edit",
                        // element: <UserEdit />
                    }
                ]
            }
        ]
    }
]);