"use server"
import { ActionResponse } from "@/interfaces/action/action-response";
import { UpdateOneResponse } from "@/interfaces/mongo/update-one-response";
import { RestrictionDocument } from "../../models/restriction-document";
import { getCollection } from "@/actions/mongo/get-collection";
import { ObjectId } from "mongodb";

export default async function updateRestriction(values: { _id: string, character: string }): Promise<ActionResponse<UpdateOneResponse>> {
    try {
        const collection = await getCollection<RestrictionDocument>("restrictions");

        

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