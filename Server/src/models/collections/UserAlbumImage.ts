import { model, Schema, Document, Types, ObjectId } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2'
import { IAlbumImage } from './AlbumImage';
import { IUser } from './User';

export interface IUserAlbumImage extends Document {
    albumImage: ObjectId | IAlbumImage;
    user: ObjectId | IUser;
    albumId: ObjectId;
}

const UserAlbumImageSchema = new Schema<IUserAlbumImage>({
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

export default model<IUserAlbumImage>('UserAlbumImages', UserAlbumImageSchema);