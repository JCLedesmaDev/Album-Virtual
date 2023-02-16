export const Collection: React.FC = () => {

    return (

        { allAlbunesColecion?.map((ColeccionAlbumes: IColeccionData, indexColeccion: number) => (
            <tr>
                <th>{ColeccionAlbumes.tituloColeccion}</th>
                <th>
                    <button className={`${AdminColeccionCSS.buttonAdmin}`} onClick={() => openUpdateColeccion(ColeccionAlbumes)}>Modificar</button>
                    <button
                        className={`${AdminColeccionCSS.buttonAdmin}`}
                        onClick={() => Delete(ColeccionAlbumes.id)}
                    >
                        Eliminar
                    </button>
                </th>
            </tr>
        ))}
    )
}