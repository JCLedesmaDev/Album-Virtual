import { useEffect } from "react"
import { Outlet, useNavigate, useNavigation, useParams } from "react-router-dom"
import { Navigate } from "../components/Navigate/Navigate"
import { SpinnerModal } from "../components/SpinnerModal/SpinnerModal"

export const AdminLayout: React.FC = () => {

    return (
        <>
            <Navigate />

            <main>
                {/* Gracais al Outlet aqui se plasmaran todos los childrens de router/index.tsx */}
                <Outlet />
            </main>
            <SpinnerModal />
            <footer>Foooter</footer>
        </>
    )
}