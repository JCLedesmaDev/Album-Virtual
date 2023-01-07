import { model, Schema, Document, Types, ObjectId } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2'
import { IRolCollection } from './Rol';
import { IUserAlbumCollection } from './UserAlbum';

export interface IUserCollection extends Document {
    fullName: string;
    email: string;
    password: string;
    passwordSalt: string;
    roles: ObjectId[] | IRolCollection[];
    albumList: ObjectId[] | IUserAlbumCollection[];
}

const UserSchema = new Schema<IUserCollection>({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordSalt: {
        type: String,
        required: true,
        // default: "Soy la descripcion", 
    },
    roles: [{ type: Types.ObjectId, ref: "Roles" }],
    albumList: [{ type: Types.ObjectId, ref: "UserAlbumes" }]
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
UserSchema.plugin(mongooseDelete, { overrideMethods: 'all' })

// Le indicamos a nuestro modelo, que va a poder paginar
UserSchema.plugin(mongoosePaginate)

export default model<IUserCollection>('Users', UserSchema);
