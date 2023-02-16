import { useState } from 'react'
import { Paginate } from '../../Components/Paginate/Paginate'
import { Albumes } from './components/albumes'
import { Collection } from './components/collection'
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
                    <tr>
                        <th>{admin.title}</th>
                        <th>Selcciona la opcion deseada</th>
                        <th>
                            <button className={`${styleModule.button}`} onClick={openModalAdd}>
                                Agregar {admin.action}
                            </button>
                        </th>
                    </tr>

                    {/* COMPONENTES */}
                    {admin.action === typeActionsAdmin.Collection && <Collection />}
                    
                    {admin.action === typeActionsAdmin.Albumes && <Albumes />}
                    
                    {admin.action === typeActionsAdmin.Figurites && <Figurites />}

                </table>

                <div>
                    <Paginate
                        ChangePage={changePage}
                        PageCount={paginate.pagesTotal}
                        LocatedPageNumber={paginate.currentPage}
                    />
                </div>
            </div>

            {/* {allAlbunesColecion.length === 0 && <Loader />} */}


            {/* <ModalContainer personCss={`${AdminColeccionCSS.containerModalColeccion}`}>

                <p onClick={() => {
                    storeGlobal.SetShowModalContainer(false)
                }} className={AdminColeccionCSS.containerModalColeccion__closeBtn}>
                    <i className="fas fa-times"></i>
                </p>

                <h1>{statusAction.action === 'add' ? 'Crear' : 'Actualizar'}</h1>

                <form onSubmit={statusAction.action === 'add' ? Add : Put} >

                    {InputsMockColeccion.map((inputProps: IInputs, index: number) => (
                        <Input
                            key={index}
                            inputProps={inputProps}
                            value={formulario[inputProps.name]}
                            handleChange={handleChange}
                            errorMessage={inputProps.errorMessage}
                            pattern={inputProps.expReg}
                        />
                    ))}

                    <button type="submit">{statusAction.action === 'add' ? 'Crear' : 'Actualizar'}</button>
                </form>

            </ModalContainer> */}
        </div>
    )
}