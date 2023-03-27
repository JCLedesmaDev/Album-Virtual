
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../appStore';
import { Paginate } from '../../components/Paginate';
import { IPurchasedAlbumModels } from '../../models/IPurchasedAlbum.models';
import { ModalContainer } from '../../components/PopupModal';
import styleCSS from './style.module.css'
import { IPurchasedFigurineModels } from '../../models/IPurchasedFigurine.models';
import { usePurchasedAlbumStore } from './store';
import { ConfigCarrouselModels } from '../../models/ConfigCarrousel.models';
import { carouselTarjets } from '../../utils/carouselTarjets';




export const PurchasedAlbumes: React.FC = () => {

    /// HOOKS
    const appStore = useAppStore()
    const store = usePurchasedAlbumStore()
    const navigate = useNavigate()

    const [purchasedAlbumSelected, setPurchasedAlbumSelected] = useState<IPurchasedAlbumModels>()


    /// METODOS
    const getAllPurchasedAlbumes = async (page: number = 1, query?: string) => {
        const arrAlbum: ConfigCarrouselModels[] = []
        await appStore.actions.getAllPurchasedAlbumes({ page, filterText: query })

        appStore.state.purchasedAlbumes.forEach((x: any, index: number) => {
            arrAlbum.push({
                individualItem: `#album-item${index}`,
                carouselWidth: 1000, // in p
                carouselId: `#album-rotator${index}`,
                carouselHolderId: `#album-rotator-holder${index}`,
            })
        })
        carouselTarjets(arrAlbum)
    }

    const changePage = ({ selected }: any) => {
        window.scrollTo(0, 0);
        getAllPurchasedAlbumes(selected + 1)
    }

    const getCountFigurusBuyOnTotal = () => {

        const countPurchasedFigurites = purchasedAlbumSelected?.purchasedFigurites.length
        const totalFiguritesToAlbum = store.state.album.figurites?.length

        return (<h5 style={{ paddingTop: '1rem' }}>Figuritas: {countPurchasedFigurites} de {totalFiguritesToAlbum}</h5>)
    }

    const openModal = async (myAlbum: IPurchasedAlbumModels) => {

        const arrAlbum: ConfigCarrouselModels[] = []

        setPurchasedAlbumSelected(myAlbum)
        appStore.actions.setShowPopup(true)
        await store.actions.getAlbum({ idAlbum: myAlbum.albumRef.id })


        purchasedAlbumSelected?.purchasedFigurites.forEach((x: any, index: number) => {
            arrAlbum.push({
                individualItem: `#modalAlbum-item${index}`,
                carouselWidth: 1000, // in p
                carouselId: `#modalAlbum-rotator${index}`,
                carouselHolderId: `#modalAlbum-rotator-holder${index}`,
            })
        })

        carouselTarjets(arrAlbum)
    }

    useEffect(() => {
        getAllPurchasedAlbumes()
    }, [])

    return (
        <div className="containerPageAlbum">
            <div id="m">

                <h1>Mis Albumes </h1>

                {appStore.state.purchasedAlbumes.length === 0 &&
                    <div className={`${styleCSS.containerNotAlbum}`}>
                        <h3>Uups... Aun no tiene ningun Album! ¿Desea comprar uno? </h3>

                        <button className={`${styleCSS.btnAlbumComprar}`} onClick={() => navigate('/')}>Ir a Album</button>
                    </div>}

                {<div id={`album-rotator0`} className="albumRotatorContainer">

                    <section id={`album-rotator-holder0`} className="albumRotatorHolder">
                        {
                            appStore.state.purchasedAlbumes.map((myAlbum: IPurchasedAlbumModels, indexEsport: number) => (
                                <article id={`album-item${indexEsport}`} style={{ cursor: 'pointer' }}
                                    className={`albumItem`} key={indexEsport}
                                >
                                    <img src={myAlbum.albumRef.image} className="image" alt="" />

                                    <div className={`albumItem__details`}>
                                        <h3>{myAlbum.albumRef.title}</h3>

                                        <button onClick={() => openModal(myAlbum)}
                                        > Ver figuritas</button>
                                    </div>
                                </article>
                            ))
                        }
                    </section>
                </div>}

                <ModalContainer personCss={`${styleCSS.containerModal}`}>

                    <div className={`containerPageAlbum`} style={{ height: '75vh' }}>
                        <div id="m" style={{ position: 'relative' }}>

                            <p onClick={() => { appStore.actions.setShowPopup(false) }}
                                className={styleCSS.containerModal__closeBtn}
                            >
                                <i className="fas fa-times"></i>
                            </p>


                            <h1>Mis Figuritas de {purchasedAlbumSelected?.albumRef.title}</h1>


                            {purchasedAlbumSelected?.purchasedFigurites.length === 0 &&
                                <div className={`${styleCSS.containerNotAlbum}`}>
                                    <h3>Uups... Aun no tiene ninguna Figurita! ¿Desea comprar una? </h3>

                                    <button className={`${styleCSS.btnAlbumComprar}`} onClick={() => navigate('/figurites')}>Ir a Figuritas</button>
                                </div>}

                            {<div id='modalAlbum-rotator0' className="albumRotatorContainer">

                                <section id='modalAlbum-rotator-holder0' className="albumRotatorHolder">
                                    {
                                        purchasedAlbumSelected?.purchasedFigurites.map((myFigus: IPurchasedFigurineModels, index: number) => (
                                            <article id={`modalAlbum-item${index}`} style={{ cursor: 'pointer' }}
                                                className={`albumItem`} key={index}
                                            >
                                                <img className="image" src={myFigus.figurineRef.image} alt="" />

                                                <div className={`albumItem__details`}>
                                                    <h3>{myFigus.figurineRef.title}</h3>
                                                </div>
                                            </article>
                                        ))
                                    }
                                </section>

                                {(purchasedAlbumSelected !== undefined && purchasedAlbumSelected.purchasedFigurites?.length > 0) && (
                                    getCountFigurusBuyOnTotal()
                                )}
                            </div>}

                        </div>
                    </div>

                </ModalContainer>

                {appStore.state.purchasedAlbumes.length != 0 && <div>
                    <Paginate
                        ChangePage={changePage}
                        PageCount={appStore.state.pagination.totalPages}
                        LocatedPageNumber={appStore.state.pagination.currentPage}
                    />
                </div>}

            </div>
        </div >

    )
}
