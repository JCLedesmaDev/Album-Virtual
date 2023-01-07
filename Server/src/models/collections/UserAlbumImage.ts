import { model, Schema, Document, Types, ObjectId } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2'
import { IAlbumImageCollection } from './AlbumImage';
import { IUserCollection } from './User';

export interface IUserAlbumImageCollection extends Document {
    albumImage: ObjectId | IAlbumImageCollection;
    user: ObjectId | IUserCollection;
    albumId: ObjectId;
}

const UserAlbumImageSchema = new Schema<IUserAlbumImageCollection>({
    albumImage: { type: Types.ObjectId, ref: "AlbumImages" },
    user: { type: Types.ObjectId, ref: "Users" },
    albumId: { type: Types.ObjectId }
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
 UserAlbumImageSchema.plugin(mongooseDelete, { overrideMethods: 'all' })

// Le indicamos a nuestro modelo, que va a poder paginar
UserAlbumImageSchema.plugin(mongoosePaginate)

export default model<IUserAlbumImageCollection>('UserAlbumImages', UserAlbumImageSchema);