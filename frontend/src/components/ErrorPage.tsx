import { useLocation } from "react-router-dom";

export default function ErrorPage() {
    const error = useLocation().state?.error
    console.log(error)
    return (
        <div className="error-page">
            <h1>
                Error :
            </h1>
            <p>
                {error}
            </p>
        </div>
    )
}