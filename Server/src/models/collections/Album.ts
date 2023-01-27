import { model, Schema, Document, Types, ObjectId, PaginateModel } from 'mongoose';
import mongooseDelete, {SoftDeleteModel, SoftDeleteInterface} from 'mongoose-delete'
import mongoosePaginate from 'mongoose-paginate-v2'
import { IAlbumImageCollection } from './AlbumImage';
import { ICollectionAlbum } from './CollectionAlbum';

export interface IAlbumCollection extends Document, SoftDeleteInterface {
    title: string;
    image: string;
    collectionAlbum: ObjectId | ICollectionAlbum;
    figurites: ObjectId[] | IAlbumImageCollection[];
}

const AlbumSchema = new Schema<IAlbumCollection>({
    title: { type: String, required: true },
    image: { type: String, required: true },
    collectionAlbum: { type: Types.ObjectId, ref: "CollectionAlbum" },
    figurites: [{ type: Types.ObjectId, ref: "AlbumImages" }]
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false, // Desactivamos la version del dato dentro de mongoose 
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
AlbumSchema.plugin(mongooseDelete, {overrideMethods: 'all' })

// Le indicamos a nuestro modelo, que va a poder paginar
AlbumSchema.plugin(mongoosePaginate)


// export default model<IAlbumCollection, SoftDeleteModel<IAlbumCollection> & PaginateModel<IAlbumCollection>>('Albumes', AlbumSchema);
export default model<IAlbumCollection, SoftDeleteModel<IAlbumCollection> & PaginateModel<IAlbumCollection>>('Albumes', AlbumSchema);