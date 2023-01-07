import { model, Schema, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'


export interface IRegisterBDCollection extends Document {
    type: string;
    user: string;
    feacture: string;
    date: Date;
    request: any;
    response: any;
}

const RegisterDbSchema = new Schema<IRegisterBDCollection>({
    type: { type: String, required: true },
    user: { type: String, required: true },
    feacture: { type: String, required: true },
    date: { type: Date, required: true },
    request: { type: String, required: true },
    response: { type: String, required: true }

}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

// Le indicamos a nuestro modelo, que va a poder paginar
RegisterDbSchema.plugin(mongoosePaginate)

export default model<IRegisterBDCollection>('RegisterDb', RegisterDbSchema);