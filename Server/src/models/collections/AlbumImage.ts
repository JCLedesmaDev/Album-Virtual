import { model, Schema, Document, Types, ObjectId } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2'
import { IAlbum } from './Album';

export interface IAlbumImage extends Document {
    titulo: string;
    album: ObjectId | IAlbum;
    urlImage: string;
}

const AlbumImageSchema = new Schema<IAlbumImage>({
    titulo: { type: String, required: true },
    urlImage: { type: String, required: true },
    album: { type: Types.ObjectId, ref: "Albumes" },
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
AlbumImageSchema.plugin(mongooseDelete, { overrideMethods: 'all' })

// Le indicamos a nuestro modelo, que va a poder paginar
AlbumImageSchema.plugin(mongoosePaginate)

export default model<IAlbumImage>('AlbumImages', AlbumImageSchema);