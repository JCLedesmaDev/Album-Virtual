import { model, Schema, Document } from 'mongoose';

export interface IRolCollection extends Document {
    name: string;
}

const RolSchema = new Schema<IRolCollection>({
    name: { type: String, required: true }
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})


export default model<IRolCollection>('Roles', RolSchema);