import { model, Schema, Document, Types, ObjectId } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2'
import { IAlbumImage } from './AlbumImage';
import { ICollectionAlbum } from './CollectionAlbum';
import { IUser } from './User';


export interface IAlbum extends Document {
    titulo: string;
    description: string;
    coleccion: ObjectId | ICollectionAlbum;
    figuritas: ObjectId[] | IAlbumImage[];
}

const AlbumSchema = new Schema<IAlbum>({
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

export default model<IAlbum>('Albumes', AlbumSchema);