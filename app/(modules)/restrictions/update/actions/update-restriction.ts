"use server"
// 1.- Librerías externas
import { ObjectId } from "mongodb";

// 2.- Interfaces
import { ActionResponse } from "@/interfaces/action/action-response";
import { UpdateOneResponse } from "@/interfaces/mongo/update-one";

// 3.- Acciones / Servicios
import getCollection from "@/actions/mongo/get-collection";
import { restrictionExists } from "../../actions/restriction-exists";

// 4.- Modelos
import { RestrictionDocument } from "../../models/restriction-document";

export default async function updateRestriction(values: { _id: string, character: string }): Promise<ActionResponse<UpdateOneResponse>> {
    try {
        const collection = await getCollection<RestrictionDocument>("restrictions");

        const restrictionExist = await restrictionExists(values.character);

        if (restrictionExist.success && restrictionExist.data) {
            return {
                success: false,
                error: "¡Ya existe una restricción con este carácter!",
                data: null
            };
        }

        const filter = { _id: new ObjectId(values._id) };

        const update = {
            $set: {
                character: values.character,
            },
        };

        const response: UpdateOneResponse = await collection.updateOne(filter, update);

        console.log(response)

        if (response.modifiedCount === 0) {
            return {
                success: false,
                error: "¡No se pudo modificar la restricción!",
                data: null
            };
        }

        return {
            success: true,
            error: null,
            data: response
        };


    } catch (error) {
        console.error('Error en action: update-restriction:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : "Error desconocido al actualizar la restricción",
            data: null
        };
    }
}

