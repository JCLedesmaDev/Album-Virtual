import { Fragment, useEffect, useState } from "react";
import { ModalContainer } from "../../../../components/PopupModal";
import { useFormCustom } from "../../../../hooks/useFormCustom";
import { IFigurineModels } from "../../../../models/IFigurine.models";
import { useAppStore } from "../../../appStore";
import { ICreateFigurineDto } from "../../interface/frontToBack/ICreateFigurine.dto";
import { IUpdateFigurineDto } from "../../interface/frontToBack/IUpdateFigurine.dto";
import { useAdministrationStore } from "../../store";
import styleCSS from '../../index.module.css'
import { IAlbumModels } from "../../../../models/IAlbum.models";
import { InputsMockFiguritas } from "./mocks/InputsFiguritas";
import { Input } from "../../../../components/Input";
import { IInputs } from "../../../../components/Input/IInputs";


export const Figurites: React.FC = () => {

    //HOOKS
    const appStore = useAppStore()
    const store = useAdministrationStore()

    const [statusAction, setStatusAction] = useState({
        action: "", idFigurine: ''
    })
    const { form, handleChange, resetForm, setForm } = useFormCustom<ICreateFigurineDto>({
        image: "", title: "", idAlbum: ''
    });

    //METODOS
    const getAllFigurites = async (page: number = 1) => {
        await appStore.actions.getAllAlbumes({ page })
    };


    const showPopupCreateAlbum = () => {
        setForm({ title: "", image: '', idAlbum: '' })
        setStatusAction({
            action: "add",
            idFigurine: ''
        })
        appStore.actions.setShowPopup(true)
    }
    const showPopupUpdateCollection = (figurine: IFigurineModels) => {
        setForm({ title: figurine.title, idAlbum: figurine.idAlbum, image: figurine.image })
        setStatusAction({
            action: "update",
            idFigurine: figurine.id
        })
        appStore.actions.setShowPopup(true)
    }


    /////////
    const createFigurine = async (event: any) => {
        event.preventDefault();
        const payload: ICreateFigurineDto = {
            idAlbum: form.idAlbum,
            image: form.image,
            title: form.title
        }
        const isCreate = await store.actions.createFigurine(payload)

        if (!isCreate) return
        await getAllFigurites();
        appStore.actions.setShowPopup(false)
        resetForm()
    };

    const updateFigurine = async (event: any) => {
        event.preventDefault();
        const payload: IUpdateFigurineDto = {
            id: statusAction.idFigurine,
            title: form.title,
            idAlbum: form.idAlbum,
            image: form.image
        }
        const isUpdate = await store.actions.updateFigurine(payload)

        if (!isUpdate) return
        await getAllFigurites();
        appStore.actions.setShowPopup(false)
        resetForm()
    };

    const deleteFigurine = async (id: string) => {
        const isDelete = await store.actions.deleteFigurine(id)
        if (!isDelete) return
        await getAllFigurites();
    };

    useEffect(() => {
        getAllFigurites();
    }, []);

    return (
        <Fragment>
            <table className={`${styleCSS.tableContainer}`} border={1}>
                <thead>
                    <tr>
                        <th>Selcciona la opcion deseada</th>
                        <th>
                            <button className={`${styleCSS.button}`} onClick={showPopupCreateAlbum}>
                                Agregar figuritas
                            </button>
                        </th>
                    </tr>
                </thead>

                {appStore.state.albumes?.map((album: IAlbumModels, indexAlbum: number) => (
                    <>
                        <h6>{album.title}</h6>
                        <tbody key={indexAlbum}>
                            {album.figurites.map((figurine: IFigurineModels, iFigurine: number) => (
                                <tr key={iFigurine}>
                                    <th>{figurine.title}</th>
                                    <th>
                                        <button className={`${styleCSS.buttonAdmin}`} onClick={
                                            () => showPopupUpdateCollection(figurine)
                                        }>Modificar</button>
                                        <button
                                            className={`${styleCSS.buttonAdmin}`}
                                            onClick={() => deleteFigurine(figurine.id)}
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

                <h1>{statusAction.action === 'add' ? 'Crear' : 'Actualizar'} Figurita</h1>

                <form onSubmit={statusAction.action === 'add' ? createFigurine : updateFigurine} >

                    {
                        statusAction.action === 'add' && (
                            <label>
                                Eliga el Album al que pertenece:
                                <select onChange={handleChange} name="idAlbum" value={form.idAlbum}>
                                    <option value={0}> </option>
                                    {appStore.state.albumes.map((album: IAlbumModels, index) => (
                                        <option value={album.id} key={index}>{album.title}</option>
                                    ))}
                                </select>
                            </label>
                        )
                    }

                    {InputsMockFiguritas.map((inputProps: IInputs, index: number) => (
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

        </Fragment>
    )
}