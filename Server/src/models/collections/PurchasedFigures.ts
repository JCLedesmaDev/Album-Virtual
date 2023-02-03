import { model, Schema, Document, Types, ObjectId, PaginateModel } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2'
import { IFigurineSchema } from './Figurites';
import { IPurchasedAlbumSchema } from './PurchasedAlbumes';

export interface IPurchasedFiguresSchema extends Document {
    figurineRef: ObjectId | IFigurineSchema;
    purchasedAlbum: ObjectId | IPurchasedAlbumSchema;
}

const PurchasedFiguresSchema = new Schema<IPurchasedFiguresSchema>({
    figurineRef: { type: Types.ObjectId, ref: "Figurites" },
    purchasedAlbum: { type: Types.ObjectId, ref: 'PurchasedAlbumes' }
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})


// Le indicamos a nuestro modelo, que va a poder paginar
PurchasedFiguresSchema.plugin(mongoosePaginate)

export default model<IPurchasedFiguresSchema, PaginateModel<IPurchasedFiguresSchema>>('PurchasedFigures', PurchasedFiguresSchema);