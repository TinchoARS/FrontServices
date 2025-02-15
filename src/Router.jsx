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
import { Ratings } from "./components/Ratings/Ratings";
import { FormServiceAdd } from "./components/services/FormServiceAdd";
import { FormPostAdd } from "./components/posts/FormPostAdd";
import { SavedList } from "./components/saved/SavedList";
import { StatusRequest } from "./components/statusservices/StatusRequest";
import { ProfileEdit } from "./components/user/ProfileEdit";

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
                        element: <FormServiceAdd />
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
                path: "/statusservices",
                element: (
                    <ProtectedRoute>
                        <StatusRequest />
                    </ProtectedRoute>
                ),
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
                    },
                    {
                        path: "addPost",
                        element: <FormPostAdd />
                    }
                ],
            },
            {   /* ratings */
                path: "/ratings",
                children: [
                    {
                        index: true,
                        element: (
                            <ProtectedRoute>
                                <Ratings />
                            </ProtectedRoute>
                        )
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
                        element: <ProfileEdit />
                    }
                ]
            },
            {
                path: "/saved",
                children: [
                    {
                        index: true,
                        element: (
                            <ProtectedRoute>
                                <SavedList />
                            </ProtectedRoute>
                        ),
                    },
                ]
            }
        ]
    }
]);