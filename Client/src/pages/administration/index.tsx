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


    const openModalAdd = () => {

    }

    return (
        <div>
            {/* Implementar un navigate entre Collection | Albumes | Figuritas */}

            <div className={`${styleModule.container}`} >
                <h1 className={`${styleModule.title}`}>Administracion de Collection Albumnes </h1>
                <p className={`${styleModule.subTitle}`}>Bienvenidos al area administrativa</p>

                <table className={`${styleModule.tableContainer}`} border={1}>
                    <thead>
                        <tr>
                            <th>{admin.title}</th>
                            <th>Selcciona la opcion deseada</th>
                            <th>
                                <button className={`${styleModule.button}`} onClick={openModalAdd}>
                                    Agregar {admin.action}
                                </button>
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {/* COMPONENTES */}
                        {admin.action === typeActionsAdmin.Collection && <Collection />}

                        {/* {admin.action === typeActionsAdmin.Albumes && <Albumes />} */}

                        {/* {admin.action === typeActionsAdmin.Figurites && <Figurites />} */}

                    </tbody>

                </table>

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