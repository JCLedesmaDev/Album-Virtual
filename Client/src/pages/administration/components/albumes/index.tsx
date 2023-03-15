import { Fragment, useEffect, useState } from "react";
import { useFormCustom } from "../../../../Hooks/useFormCustom";
import { useAppStore } from "../../../appStore";
import { ICreateAlbumDto } from "../../interface/frontToBack/ICreateAlbum.dto";
import { useAdministrationStore } from "../../store";
import styleCSS from '../../index.module.css'
import { IInputs } from "../../../../components/Input/IInputs";
import { InputsMockAlbum } from "./mocks/InputsAlbum";
import { Input } from "@angular/core";
import { ModalContainer } from "../../../../components/PopupModal";
import { IAlbumModels } from "../../../../interface/models/IAlbum.models";


export const Albumes: React.FC = () => {


    //HOOKS
    const appStore = useAppStore()
    const store = useAdministrationStore()

    const [statusAction, setStatusAction] = useState({
        action: "", idAlbum: ''
    })
    const { form, handleChange, resetForm, setForm } = useFormCustom<ICreateAlbumDto>({
        idColeccion: '', image: '', title: ''
    });

    //METODOS
    const getAllAlbumes = async (page: number = 1) => {
        await appStore.actions.getAllAlbumes({ page }) // ver
    };

    const showPopupCreateAlbum = () => {
        setForm({ title: "", image: '', idColeccion: '' })
        setStatusAction({
            action: "add",
            idAlbum: ''
        })
        appStore.actions.setShowPopup(true)
    }

    const showPopupUpdateCollection = (Album: IAlbumModels) => {
        setForm({ title: Album.title, idColeccion: Album.idCollection, image: Album.image })
        setStatusAction({
            action: "update",
            idAlbum: Album.id
        })
        appStore.actions.setShowPopup(true)
    }


    /////////
    const createAlbum = async (event: any) => {

        // try {
        //     event.preventDefault();
        //     storeGlobal.SetShowLoader(true)


        //     console.log("Crear", formulario)
        //     const { Result, MessageError } = await AdminAlbumService.AddAdminAlbumes(formulario);

        //     if (MessageError !== undefined) {
        //         throw new Error(MessageError);
        //     }

        //     storeGlobal.SetShowLoader(false);
        //     storeGlobal.SetMessageModalStatus(Result);
        //     storeGlobal.SetShowModalStatus(true);

        //     await getAll();
        // } catch (error: any) {

        //     storeGlobal.SetShowLoader(false)
        //     storeGlobal.SetMessageModalStatus(`Uups... ha occurrido un ${error}. \n \n Intentelo nuevamente`)
        //     storeGlobal.SetShowModalStatus(true)

        // } finally {
        //     resetForm()
        //     setTimeout(() => {
        //         storeGlobal.SetShowModalStatus(false)
        //     }, 5000);
        // }

    };

    const updateAlbum = async (event: any) => {
        // try {
        //     event.preventDefault();
        //     storeGlobal.SetShowLoader(true)


        //     console.log("Crear", formulario)
        //     const { Result, MessageError } = await AdminAlbumService.updateAdminAlbumes(statusAction.idAlbum, formulario);

        //     if (MessageError !== undefined) {
        //         throw new Error(MessageError);
        //     }

        //     storeGlobal.SetShowLoader(false);
        //     storeGlobal.SetMessageModalStatus(Result);
        //     storeGlobal.SetShowModalStatus(true);

        //     await getAll();
        // } catch (error: any) {

        //     storeGlobal.SetShowLoader(false)
        //     storeGlobal.SetMessageModalStatus(`Uups... ha occurrido un ${error}. \n \n Intentelo nuevamente`)
        //     storeGlobal.SetShowModalStatus(true)

        // } finally {
        //     resetForm()
        //     setTimeout(() => {
        //         storeGlobal.SetShowModalStatus(false)
        //     }, 5000);
        //     storeGlobal.SetShowModalContainer(false)
        // }
    };

    const deleteAlbum = async (id: string) => {
        // const isDelete = await store.actions.deleteCollection(id)
        // if (!isDelete) return
        // await getAllAlbumes();
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
                                Agregar coleccion
                            </button>
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {appStore.state.albumes?.map((Albumes: IAlbumModels, indexAlbum: number) => (
                        <tr key={indexAlbum}>
                            <th>{Albumes.title}</th>
                            <th>
                                <button className={`${styleCSS.buttonAdmin}`} onClick={
                                    () => showPopupUpdateCollection(Albumes)
                                }>Modificar</button>
                                <button
                                    className={`${styleCSS.buttonAdmin}`}
                                    onClick={() => deleteAlbum(Albumes.id)}
                                >
                                    Eliminar
                                </button>
                            </th>
                        </tr>
                    ))}

                </tbody>
            </table>


            <ModalContainer personCss={`${styleCSS.containerModalAlbum}`}>

                <p onClick={() => {
                    appStore.actions.setShowPopup(false)
                }} className={styleCSS.containerModalAlbum__closeBtn}>
                    <i className="fas fa-times"></i>
                </p>

                <h1>{statusAction.action === 'add' ? 'Crear' : 'Actualizar'} Album</h1>

                <form onSubmit={statusAction.action === 'add' ? createAlbum : updateAlbum} >

                    {/* {
                        statusAction.action === 'add' && (

                            <label>
                                Eliga coleccion de Album:
                                <select onChange={handleChange} name="IdColeccion" value={formulario.IdColeccion}>
                                    <option value={0}> </option>
                                    {allListColeccion.map((coleccion, index) => (
                                        <option value={coleccion.id} key={index}>{coleccion.nombreCompleto}</option>
                                    ))}
                                </select>
                            </label>
                        )
                    } */}

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
        </Fragment>
    )
}