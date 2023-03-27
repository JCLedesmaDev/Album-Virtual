/* eslint-disable jsx-a11y/anchor-is-valid */
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';
import { useAppStore } from '../appStore';
import { ConfigCarrouselModels } from '../../models/ConfigCarrousel.models';
import { IAlbumCollectionModels } from '../../models/IAlbumCollection.models';
import { carouselTarjets } from '../../utils/carouselTarjets';
import { IAlbumModels } from '../../models/IAlbum.models';
import { Paginate } from '../../components/Paginate';
import { useAlbumStore } from './store';
import { useSearchParams } from 'react-router-dom';



export const Albumes: React.FC = () => {

    /// HOOKS
    const appStore = useAppStore()
    const store = useAlbumStore()

    const [searchParams, setSearchParams] = useSearchParams();
    const filter: string = searchParams.get("filter") ?? "";


    /// METODOS
    const getAllAlbumCollections = async (page: number = 1) => {
        const arrAlbum: ConfigCarrouselModels[] = []

        await appStore.actions.getAllAlbumCollections({ page, filterText: filter })

        appStore.state.collection.map((collection: IAlbumCollectionModels, index: number) => {
            arrAlbum.push({
                individualItem: `#album-item${index}`,
                carouselWidth: 1000, // in p
                carouselId: `#album-rotator${index}`,
                carouselHolderId: `#album-rotator-holder${index}`,
            })
        })
        carouselTarjets(arrAlbum)
    }

    const buyAlbum = async (idAlbum: string) => {
        await store.actions.buyAlbum({ idAlbum })
    }

    const changePage = ({ selected }: any) => {
        window.scrollTo(0, 0);
        getAllAlbumCollections(selected + 1)
    }

    const handleFilter = (e: any) => {
        setSearchParams({
            filter: e.target.value
        });
    };


    useEffect(() => { getAllAlbumCollections() }, [])

    return (
        <div className="containerPageAlbum">
            <div id="m">
                <div className="container">
                    <div className="input-group mb-3">
                        <input
                            type="text" className="form-control"
                            placeholder="Escribe la tematica deseada"
                            onChange={handleFilter}
                            value={filter}
                        />
                        <div className="input-group-append">
                            <button type="button" className="btn btn-primary"
                                onClick={() => getAllAlbumCollections(1)}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <br />

                {appStore.state.collection?.map((collection: IAlbumCollectionModels, indexAlbum: number) => {
                    return (
                        <div id={`album-rotator${indexAlbum}`} key={indexAlbum} className="albumRotatorContainer">
                            <h1 className='title'>{collection.title}</h1>

                            <section id={`album-rotator-holder${indexAlbum}`} className="albumRotatorHolder">
                                {
                                    collection?.albumList.map((album: IAlbumModels, indexEsport: number) => (
                                        <article
                                            id={`album-item${indexAlbum}`}
                                            className={`albumItem`} key={indexEsport}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <img src={album.image} className="image" alt="" />
                                            <div className={`albumItem__details`} >
                                                <h3>{album.title}</h3>
                                                <button className="btnAlbumComprar" type='submit' onClick={() => buyAlbum(album.id)}>Comprar</button>
                                            </div>
                                        </article>
                                    ))
                                }
                            </section>
                        </div>
                    )
                })}
                <div>
                    <Paginate
                        ChangePage={changePage}
                        PageCount={appStore.state.pagination.totalPages}
                        LocatedPageNumber={appStore.state.pagination.currentPage}
                    />
                </div>
            </div>

        </div>
    );
}