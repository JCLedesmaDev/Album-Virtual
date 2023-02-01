import { model, Schema, Document, Types, ObjectId } from 'mongoose';
import mongooseDelete, { SoftDeleteInterface, SoftDeleteModel } from 'mongoose-delete';
// import mongoosePaginate from 'mongoose-paginate-v2'
import { IAlbumSchema } from './Albumes';

export interface IFigurineSchema extends Document, SoftDeleteInterface {
    title: string;
    album: ObjectId | IAlbumSchema;
    image: string;
}

const FigurineSchema = new Schema<IFigurineSchema>({
    title: { type: String, required: true },
    image: { type: String, required: true },
    album: { type: Types.ObjectId, ref: "Albumes" },
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
 FigurineSchema.plugin(mongooseDelete, { overrideMethods: 'all' })

// Le indicamos a nuestro modelo, que va a poder paginar
// FigurineSchema.plugin(mongoosePaginate)

export default model<IFigurineSchema, SoftDeleteModel<IFigurineSchema>>('Figurites', FigurineSchema);