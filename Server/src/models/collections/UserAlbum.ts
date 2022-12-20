import { model, Schema, Document, Types, ObjectId } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2'
import { IAlbum } from './Album';
import { IUser } from './User';

export interface IUserAlbum extends Document {
    album: ObjectId | IAlbum; // TODO: cambiar por la interface de Roles
    user: ObjectId | IUser;
}

const UserAlbumSchema = new Schema<IUserAlbum>({
    album: { type: Types.ObjectId, ref: "Albumes" },
    user: { type: Types.ObjectId, ref: "Users" }
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
 UserAlbumSchema.plugin(mongooseDelete, { overrideMethods: 'all' })

// Le indicamos a nuestro modelo, que va a poder paginar
UserAlbumSchema.plugin(mongoosePaginate)

export default model<IUserAlbum>('UserAlbumes', UserAlbumSchema);