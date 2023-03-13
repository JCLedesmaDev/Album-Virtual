import { model, Schema, Document, Types, ObjectId, PaginateModel } from 'mongoose';
import mongooseDelete, {SoftDeleteModel, SoftDeleteInterface} from 'mongoose-delete'
import mongoosePaginate from 'mongoose-paginate-v2'
import { IFigurineSchema } from './Figurites';
import { IAlbumCollectionSchema } from './AlbumCollections';

export interface IAlbumSchema extends Document, SoftDeleteInterface {
    title: string;
    image: string;
    albumCollections: ObjectId | IAlbumCollectionSchema;
    figurites: ObjectId[] | IFigurineSchema[];
}

const AlbumSchema = new Schema<IAlbumSchema>({
    title: { type: String, required: true },
    image: { type: String, required: true },
    albumCollections: { type: Types.ObjectId, ref: "AlbumCollections" },
    figurites: [{ type: Types.ObjectId, ref: "Figurites" }]
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
export default model<IAlbumSchema, SoftDeleteModel<IAlbumSchema> & PaginateModel<IAlbumSchema>>('Albumes', AlbumSchema);