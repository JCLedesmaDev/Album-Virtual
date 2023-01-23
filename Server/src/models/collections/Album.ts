import { model, Schema, Document, Types, ObjectId, PaginateModel } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2'
import { IAlbumImageCollection } from './AlbumImage';
import { ICollectionAlbum } from './CollectionAlbum';


// export interface IAlbumCollection extends Document {
export interface IAlbumCollection {
    titulo: string;
    description: string;
    coleccion: ObjectId | ICollectionAlbum;
    figuritas: ObjectId[] | IAlbumImageCollection[];
}

const AlbumSchema = new Schema<IAlbumCollection>({
    titulo: { type: String, required: true },
    description: { type: String, required: true },
    coleccion: { type: Types.ObjectId, ref: "CollectionAlbumes" },
    figuritas: [{ type: Types.ObjectId, ref: "AlbumImages" }]
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
AlbumSchema.plugin(mongooseDelete, { overrideMethods: 'all' })

// Le indicamos a nuestro modelo, que va a poder paginar
AlbumSchema.plugin(mongoosePaginate)

export default model<IAlbumCollection, PaginateModel<IAlbumCollection>>('Albumes', AlbumSchema);