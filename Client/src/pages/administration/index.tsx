import { useState } from 'react'
import { Paginate } from '../../components/Paginate'
import { Albumes } from './components/albumes'
import { Collection } from './components/albumCollections'
import { Figurites } from './components/figurites'
import styleModule from './index.module.css'
import { useAppStore } from '../appStore'


export const Administration: React.FC = () => {

    const appStore = useAppStore()

    enum typeActionsAdmin {
        Collection = 'Collection',
        Figurites = 'Figurites',
        Albumes = 'Albumes'
    }

    const [admin, setAdmin] = useState({
        title: 'Titulo de Coleccion de Album',
        action: 'Collection'
    })

    const changePage = ({ selected }: any) => {
        window.scrollTo(0, 0);
        console.log('AAA')
        /// determianr segun la action, que metodo del store ejecutar (otros getAll)
        appStore.actions.getAllAlbumCollections({  page: selected + 1})
    }

    return (
        <div>
            {/* Implementar un navigate entre Collection | Albumes | Figuritas */}

            <div className={`${styleModule.container}`} >
                <h1 className={`${styleModule.title}`}>Administracion de Collection Albumnes </h1>
                <p className={`${styleModule.subTitle}`}>Bienvenidos al area administrativa</p>


                {admin.action === typeActionsAdmin.Collection && <Collection />}

                {/* {admin.action === typeActionsAdmin.Albumes && <Albumes />} */}

                {/* {admin.action === typeActionsAdmin.Figurites && <Figurites />} */}


                <div>
                    <Paginate
                        ChangePage={changePage}
                        PageCount={appStore.state.pagination.totalPages}
                        LocatedPageNumber={appStore.state.pagination.currentPage}
                    />
                </div>
            </div>

        </div>
    )
}