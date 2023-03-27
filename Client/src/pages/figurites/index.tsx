import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Paginate } from '../../components/Paginate';
import { ConfigCarrouselModels } from '../../models/ConfigCarrousel.models';
import { IAlbumModels } from '../../models/IAlbum.models';
import { IFigurineModels } from '../../models/IFigurine.models';
import { carouselTarjets } from '../../utils/carouselTarjets';
import { useAppStore } from '../appStore';
import store from '../authUser/store';
import { useFigurineStore } from './store';
import './style.css'


export const Figurites: React.FC = () => {


    /// HOOKS
    const appStore = useAppStore()
    const store = useFigurineStore()

    const [searchParams, setSearchParams] = useSearchParams();
    const filter: string = searchParams.get("filter") ?? "";

    /// METODOS
    const getAllAlbumes = async (page: number = 1) => {
        const arrAlbumImg: ConfigCarrouselModels[] = []

        await appStore.actions.getAllAlbumes({ page, filterText: filter })

        appStore.state.albumes.map((albumes: IAlbumModels, index: number) => {
            arrAlbumImg.push({
                individualItem: `#album-item${index}`,
                carouselWidth: 1000, // in p
                carouselId: `#album-rotator${index}`,
                carouselHolderId: `#album-rotator-holder${index}`,
            })
        })

        carouselTarjets(arrAlbumImg)
    }

    const changePage = ({ selected }: any) => {
        window.scrollTo(0, 0);
        getAllAlbumes(selected + 1)
    }

    const buyFigurita = async (idFigurine: string, idAlbum: string) => {
        await store.actions.buyFigurine({ idFigurine, idAlbum })
    }

    const handleFilter = (e: any) => {
        setSearchParams({
            filter: e.target.value
        });
    };

    useEffect(() => {
        getAllAlbumes()
    }, [])

    return (
        <div className="containerPageAlbum">

            <div id="m">

                <div className="container">
                    <div className="input-group mb-3">
                        <input
                            type="text" className="form-control"
                            placeholder="Escribe album o torneo deseado"
                            onChange={handleFilter}
                            value={filter}
                        />
                        <div className="input-group-append">
                            <button type="button" className="btn btn-primary"
                                onClick={() => getAllAlbumes(1)}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>


                {appStore.state.albumes.map((Album: IAlbumModels, indexAlbum: number) => (

                    <div id={`album-rotator${indexAlbum}`} key={indexAlbum} className="albumRotatorContainer">

                        <h1 className='title'>{Album.title}</h1>

                        <section id={`album-rotator-holder${indexAlbum}`} className="albumRotatorHolder">
                            {
                                Album.figurites.map((figurine: IFigurineModels, indexEsport: number) => (
                                    <article id={`album-item${indexAlbum}`} style={{ cursor: 'pointer' }}
                                        className={`albumItem`} key={indexEsport}
                                    >
                                        <img src={figurine.image} alt="" className="image" />

                                        <div className={`albumItem__details`}>
                                            <h3>{figurine.title}</h3>
                                            <button className="btnFiguritasComprar" type='submit'
                                                onClick={() => buyFigurita(figurine.id, figurine.idAlbum)}>Comprar</button>
                                        </div>

                                    </article>
                                ))
                            }
                        </section>
                    </div>
                ))}
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