import { model, Schema, Document, Types, ObjectId } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2'
import { IFiguresSchema } from './Figurites';
import { IPurchasedAlbumSchema } from './PurchasedAlbumes';
import { IUserSchema } from './Users';

export interface IPurchasedFiguresSchema extends Document {
    figures: ObjectId | IFiguresSchema;
    user: ObjectId | IUserSchema;
    purchasedAlbum: ObjectId | IPurchasedAlbumSchema;
}

const PurchasedFiguresSchema = new Schema<IPurchasedFiguresSchema>({
    figures: { type: Types.ObjectId, ref: "Figurites" },
    user: { type: Types.ObjectId, ref: "Users" },
    purchasedAlbum: { type: Types.ObjectId, ref: 'PurchasedAlbumes' }
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
PurchasedFiguresSchema.plugin(mongooseDelete, { overrideMethods: 'all' })

// Le indicamos a nuestro modelo, que va a poder paginar
PurchasedFiguresSchema.plugin(mongoosePaginate)

export default model<IPurchasedFiguresSchema>('PurchasedFigures', PurchasedFiguresSchema);