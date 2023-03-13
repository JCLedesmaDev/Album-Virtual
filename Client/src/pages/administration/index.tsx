import { useState } from 'react'
import { Paginate } from '../../components/Paginate'
import { Albumes } from './components/albumes'
import { Collection } from './components/albumCollections'
import { Figurites } from './components/figurites'
import styleModule from './index.module.css'


export const Administration: React.FC = () => {

    enum typeActionsAdmin {
        Collection = 'Collection',
        Figurites = 'Figurites',
        Albumes = 'Albumes'
    }

    const [admin, setAdmin] = useState({
        title: 'Titulo de Coleccion de Album',
        action: 'Collection'
    })


    const openModalAdd = (callBack: any) => {
        callBack()
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
                    {/* <Paginate
                        ChangePage={changePage}
                        PageCount={paginate.pagesTotal}
                        LocatedPageNumber={paginate.currentPage}
                    /> */}
                </div>
            </div>

            {/* {allAlbunesColecion.length === 0 && <Loader />} */}
        </div>
    )
}