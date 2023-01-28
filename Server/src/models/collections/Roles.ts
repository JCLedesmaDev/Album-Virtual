import { model, Schema, Document } from 'mongoose';

export interface IRolSchema extends Document {
    name: string;
}

const RolSchema = new Schema<IRolSchema>({
    name: { type: String, required: true }
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})


export default model<IRolSchema>('Roles', RolSchema);