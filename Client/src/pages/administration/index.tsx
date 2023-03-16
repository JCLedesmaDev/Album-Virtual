import { useState } from 'react'
import { Paginate } from '../../components/Paginate'
import { Albumes } from './components/albumes'
import { Collection } from './components/albumCollections'
import { Figurites } from './components/figurites'
import styleModule from './index.module.css'
import { useAppStore } from '../appStore'
import { Container, Nav, Navbar } from 'react-bootstrap'


enum typeActionsAdmin {
    Collection = 'collection',
    Figurites = 'figures',
    Albumes = 'albumes'
}

export const Administration: React.FC = () => {

    const appStore = useAppStore()

    const [admin, setAdmin] = useState({
        title: 'Coleccion de Albumes',
        action: 'collection'
    })

    const changePage = ({ selected }: any) => {
        window.scrollTo(0, 0);
        console.log('AAA')
        /// determianr segun la action, que metodo del store ejecutar (otros getAll)
        appStore.actions.getAllAlbumCollections({ page: selected + 1 })
    }

    const changeActionPage = (action: string, title: string) => {
        setAdmin({
            action,
            title
        })
    }


    return (
        <div className={`${styleModule.container}`}>

            <h1 className={`${styleModule.title}`}>Bienvenidos al area administrativa </h1>

            <Navbar bg="" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => changeActionPage('collection', 'coleccion de albumes')}>Collections</Nav.Link>
                        <Nav.Link onClick={() => changeActionPage('albumes', 'albumes')}>Albumes</Nav.Link>
                        <Nav.Link onClick={() => changeActionPage('figures', 'figuritas')}>Figuritas</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <p className={`${styleModule.subTitle}`}>Administracion de {admin.title} </p>

 
            {admin.action === typeActionsAdmin.Collection && <Collection />}

            {admin.action === typeActionsAdmin.Albumes && <Albumes />}

            {/* {admin.action === typeActionsAdmin.Figurites && <Figurites />} */}

            <div>
                <Paginate
                    ChangePage={changePage}
                    PageCount={appStore.state.pagination.totalPages}
                    LocatedPageNumber={appStore.state.pagination.currentPage}
                />
            </div>
        </div>
    )
}