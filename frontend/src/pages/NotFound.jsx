import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-8xl text-green-700 font-bold">404</h1>
            <p className="text-xl mt-4">Page Not Found</p>

            <Link
                to="/dashboard"
                className="mt-6 text-white bg-green-600 rounded-xl px-6 py-3">
                Back to Dashboard
            </Link>

        </div>
    )
}

export default NotFound
