import { useRouteError } from "react-router-dom"



export const NotFound: React.FC = () => {

    const error = useRouteError()
    console.log("🚀 ~ file: index.tsx:8 ~ error", error)


    return (
        <h1>'Not found'</h1>
    )
}