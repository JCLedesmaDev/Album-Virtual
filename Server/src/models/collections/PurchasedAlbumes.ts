import { model, Schema, Document, Types, ObjectId } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2'
import { IAlbumSchema } from './Albumes';
import { IPurchasedFiguresSchema } from './PurchasedFigures';
import { IUserSchema } from './Users';

export interface IPurchasedAlbumSchema extends Document {
    albumRef: ObjectId | IAlbumSchema; // TODO: cambiar por la interface de Roles
    user: ObjectId | IUserSchema;
    purchasedFigures: ObjectId[] | IPurchasedFiguresSchema[];
}

const PurchasedAlbumSchema = new Schema<IPurchasedAlbumSchema>({
    albumRef: { type: Types.ObjectId, ref: "Albumes" },
    user: { type: Types.ObjectId, ref: "Users" },
    purchasedFigures: [{ type: Types.ObjectId, ref: "PurchasedFigures" }]
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
PurchasedAlbumSchema.plugin(mongooseDelete, { overrideMethods: 'all' })

// Le indicamos a nuestro modelo, que va a poder paginar
PurchasedAlbumSchema.plugin(mongoosePaginate)

export default model<IPurchasedAlbumSchema>('PurchasedAlbumes', PurchasedAlbumSchema);