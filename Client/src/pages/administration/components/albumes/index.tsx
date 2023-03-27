import { ChangeEventHandler, Fragment, useEffect, useState } from "react";
import { useFormCustom } from "../../../../hooks/useFormCustom";
import { useAppStore } from "../../../appStore";
import { ICreateAlbumDto } from "../../interface/frontToBack/ICreateAlbum.dto";
import { useAdministrationStore } from "../../store";
import styleCSS from '../../index.module.css'
import { IInputs } from "../../../../components/Input/IInputs";
import { InputsMockAlbum } from "./mocks/InputsAlbum";
import { ModalContainer } from "../../../../components/PopupModal";
import { IAlbumModels } from "../../../../models/IAlbum.models";
import { Input } from "../../../../components/Input";
import { IUpdateAlbumDto } from "../../interface/frontToBack/IUpdateAlbum.dto";
import { IAlbumCollectionModels } from "../../../../models/IAlbumCollection.models";


export const Albumes: React.FC = () => {


    //HOOKS
    const appStore = useAppStore()
    const store = useAdministrationStore()

    const [statusAction, setStatusAction] = useState({
        action: "", idAlbum: ''
    })
    const { form, handleChange, resetForm, setForm } = useFormCustom<ICreateAlbumDto>({
        idCollection: '', image: '', title: ''
    });

    //METODOS
    const getAllAlbumes = async (page: number = 1) => {
        await appStore.actions.getAllAlbumCollections({ page })
    };

    const showPopupCreateAlbum = () => {
        setForm({ title: "", image: '', idCollection: '' })
        setStatusAction({
            action: "add",
            idAlbum: ''
        })
        appStore.actions.setShowPopup(true)
    }

    const showPopupUpdateCollection = (Album: IAlbumModels) => {
        setForm({ title: Album.title, idCollection: Album.idCollection, image: Album.image })
        setStatusAction({
            action: "update",
            idAlbum: Album.id
        })
        appStore.actions.setShowPopup(true)
    }


    /////////
    const createAlbum = async (event: any) => {
        event.preventDefault();
        const payload: ICreateAlbumDto = {
            idCollection: form.idCollection,
            image: form.image,
            title: form.title
        }
        const isCreate = await store.actions.createAlbum(payload)

        if (!isCreate) return
        await getAllAlbumes();
        appStore.actions.setShowPopup(false)
        resetForm()
    };

    const updateAlbum = async (event: any) => {
        event.preventDefault();
        const payload: IUpdateAlbumDto = {
            id: statusAction.idAlbum,
            title: form.title,
            idCollection: form.idCollection,
            image: form.image
        }

        const isUpdate = await store.actions.updateAlbum(payload)
        if (!isUpdate) return

        appStore.actions.setShowPopup(false)
        resetForm()
        await getAllAlbumes();
    };

    const deleteAlbum = async (id: string) => {
        const isDelete = await store.actions.deleteAlbum(id)
        if (!isDelete) return
        await getAllAlbumes();
    };


    useEffect(() => {
        getAllAlbumes();
    }, []);

    return (
        <Fragment>
            <table className={`${styleCSS.tableContainer}`} border={1}>
                <thead>
                    <tr>
                        <th>Selcciona la opcion deseada</th>
                        <th>
                            <button className={`${styleCSS.button}`} onClick={showPopupCreateAlbum}>
                                Agregar album
                            </button>
                        </th>
                    </tr>
                </thead>


                {appStore.state.collection?.map((collection: IAlbumCollectionModels, indexCollection: number) => (
                    <>
                        <h6>{collection.title}</h6>
                        <tbody key={indexCollection}>
                            {collection.albumList.map((album: IAlbumModels, index: number) => (
                                <tr key={index}>
                                    <th>{album.title}</th>
                                    <th>
                                        <button className={`${styleCSS.buttonAdmin}`} onClick={
                                            () => showPopupUpdateCollection(album)
                                        }>Modificar</button>
                                        <button
                                            className={`${styleCSS.buttonAdmin}`}
                                            onClick={() => deleteAlbum(album.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>

                    </>
                ))}

            </table>

            <ModalContainer personCss={`${styleCSS.containerModalColeccion}`}>

                <p onClick={() => {
                    appStore.actions.setShowPopup(false)
                }} className={styleCSS.containerModalColeccion__closeBtn}>
                    <i className="fas fa-times"></i>
                </p>

                <h1>{statusAction.action === 'add' ? 'Crear' : 'Actualizar'} Album</h1>

                <form onSubmit={statusAction.action === 'add' ? createAlbum : updateAlbum} >

                    {statusAction.action === 'add' && (

                        <label>
                            Eliga coleccion de Album:
                            <select onChange={handleChange} name="idCollection" value={form.idCollection}>
                                <option value={0}> </option>
                                {appStore.state.collection.map((coleccion, index) => (
                                    <option value={coleccion.id} key={index}>{coleccion.title}</option>
                                ))}
                            </select>
                        </label>
                    )}

                    {InputsMockAlbum.map((inputProps: IInputs, index: number) => (
                        <Input
                            key={index}
                            inputProps={inputProps}
                            value={form[inputProps.name]}
                            handleChange={handleChange}
                            errorMessage={inputProps.errorMessage}
                            pattern={inputProps.expReg}
                        />
                    ))}

                    <button type="submit">{statusAction.action === 'add' ? 'Crear' : 'Actualizar'}</button>
                </form>

            </ModalContainer>
        </Fragment >
    )
}