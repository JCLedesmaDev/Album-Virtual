import { model, Schema, Document, Types, ObjectId, PaginateModel } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2'
import { IAlbumCollection } from './Album';


export interface ICollectionAlbum extends Document {
    titulo: string;
    albumes: ObjectId[] | IAlbumCollection[];
}

const CollectionAlbumSchema = new Schema<ICollectionAlbum>({
    titulo: { type: String, required: true },
    albumes: [{ type: Types.ObjectId, ref: "Albumes" }]
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
CollectionAlbumSchema.plugin(mongooseDelete, { overrideMethods: 'all' })

// Le indicamos a nuestro modelo, que va a poder paginar
CollectionAlbumSchema.plugin(mongoosePaginate)

export default model<ICollectionAlbum, PaginateModel<ICollectionAlbum>>('CollectionAlbum', CollectionAlbumSchema);