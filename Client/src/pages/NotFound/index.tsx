import { Link, useRouteError } from "react-router-dom"



export const NotFound: React.FC = () => {

    const error = useRouteError() as any
    console.log("🚀 ~ file: index.tsx:8 ~ error", error)


    return (
        <div>
            <h1>404</h1>
            <p>Page not found</p>
            <p>{error.statusText || error.message}</p>
            <Link to="/">Volver al HOme</Link>
        </div>
    )
}