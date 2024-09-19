import { useRouteError } from "react-router-dom";

interface RouteError {
    statusText?: string;
    message?: string;
}

export default function ErrorPage() {
    const error = useRouteError() as RouteError;
    console.error(error);

    return (
        <div id="error-page" className="bg-background-50 flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold text-red-600 mb-2">Oops!</h1>
            <p className="text-lg text-text-950">Sorry, an unexpected error has occurred.</p>
            <p className="text-md text-text-900 mt-4">
                <i>{error?.statusText || error?.message || "Unknown error"}</i>
            </p>
        </div>
    );
}
