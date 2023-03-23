
import './style.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../appStore';
import { Paginate } from '../../components/Paginate';




export const PurchasedAlbumes: React.FC = () => {

    /// HOOKS
    const appStore = useAppStore()
    const navigate = useNavigate()


    /// METODOS
    const getAllPurchasedAlbumes = async (page: number = 1) => {
        await appStore.actions.getAllPurchasedAlbumes({page, filterText: ''})
    }

    const changePage = ({ selected }: any) => {
        window.scrollTo(0, 0);
        getAllPurchasedAlbumes(selected + 1)
    }



    useEffect(() => {
        getAllPurchasedAlbumes()
    }, [])

    return (


        <div className="containerPageAlbum">
            <div id="m">

                <h1>Mis Albumes </h1>


                {appStore.state.purchasedAlbumes.length === 0 &&
                    <div className='containerNotAlbum'>
                        <h3>Uups... Aun no tiene ningun Album! ¿Desea comprar uno? </h3>

                        <button className='btnAlbumComprar' onClick={() => navigate('/')}>Ir a Album</button>
                    </div>
                }

                {
                    <div id={`album-rotator0`} className="albumRotatorContainer">

                        <section id={`album-rotator-holder0`} className="albumRotatorHolder">
                            {
                                appStore.state.purchasedAlbumes.map((myAlbum: any, indexEsport: number) => (
                                    <article id={`album-item0`} style={{ cursor: 'pointer' }}
                                        className={`albumItem`} key={indexEsport}
                                    >
                                        <img src={myAlbum.album.imagen} className="image" alt="" />

                                        <div className={`albumItem__details`}>
                                            <h3>{myAlbum.album.titulo}</h3>

                                            <button
                                                onClick={() => navigate(`/purchasedFigures/${myAlbum.albumId}`)}
                                            > Ver figuritas</button>
                                        </div>
                                    </article>
                                ))
                            }
                        </section>
                    </div>
                }

                {
                    appStore.state.purchasedAlbumes.length != 0 && <div>
                        <Paginate
                            ChangePage={changePage}
                            PageCount={appStore.state.pagination.totalPages}
                            LocatedPageNumber={appStore.state.pagination.currentPage}
                        />
                    </div>
                }

            </div>
        </div>

    )
}
