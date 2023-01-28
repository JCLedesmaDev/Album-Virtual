import { model, Schema, Document, Types, ObjectId, PaginateModel } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2'
import { IAlbumSchema } from './Albumes';


export interface IAlbumCollectionSchema extends Document {
    titulo: string;
    albumes: ObjectId[] | IAlbumSchema[];
}

const AlbumCollectionSchema = new Schema<IAlbumCollectionSchema>({
    titulo: { type: String, required: true },
    albumes: [{ type: Types.ObjectId, ref: "Albumes" }]
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
 AlbumCollectionSchema.plugin(mongooseDelete, { overrideMethods: 'all' })

// Le indicamos a nuestro modelo, que va a poder paginar
AlbumCollectionSchema.plugin(mongoosePaginate)

export default model<IAlbumCollectionSchema, PaginateModel<IAlbumCollectionSchema>>('AlbumCollections', AlbumCollectionSchema);