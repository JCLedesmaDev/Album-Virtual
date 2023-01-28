import { model, Schema, Document, Types, ObjectId } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2'
import { IAlbumSchema } from './Albumes';
import { IUserSchema } from './Users';

export interface IPurchasedAlbumSchema extends Document {
    album: ObjectId | IAlbumSchema; // TODO: cambiar por la interface de Roles
    user: ObjectId | IUserSchema;
}

const PurchasedAlbumSchema = new Schema<IPurchasedAlbumSchema>({
    album: { type: Types.ObjectId, ref: "Albumes" },
    user: { type: Types.ObjectId, ref: "Users" }
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