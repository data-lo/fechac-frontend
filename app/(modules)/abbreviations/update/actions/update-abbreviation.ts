"use server"
// 1.- Librerías externas
import { ObjectId } from "mongodb";

// 2.- Interfaces
import { ActionResponse } from "@/interfaces/action/action-response";
import { UpdateOneResponse } from "@/interfaces/mongo/update-one";

// 3.- Acciones / Servicios
import getCollection from "@/actions/mongo/get-collection";
// import abbreviationExist from "../../actions/abbreviation-exist";

// 4.- Modelos
import { AbbreviationDocument } from "../../models/abbreviation-document";

export default async function updateAbbreviation(values: { _id: string, abbreviation: string, name: string, type: string }): Promise<ActionResponse<UpdateOneResponse>> {
    try {
        const collection = await getCollection<AbbreviationDocument>("abbreviations");

        // const abbreviation = await abbreviationExist(values.abbreviation);

        // if (abbreviation.success && abbreviation.data) {
        //     return {
        //         success: false,
        //         error: "¡Ya existe una abreviación igual!",
        //         data: null
        //     };
        // }

        const filter = { _id: new ObjectId(values._id) };

        const update = {
            $set: {
                abbreviation: values.abbreviation,
                name: values.name,
                type: values.type
            },
        };

        const response: UpdateOneResponse = await collection.updateOne(filter, update);


        if (response.modifiedCount === 0) {
            return {
                success: false,
                error: "¡No se pudo modificar la abreviación!",
                data: null
            };
        }

        return {
            success: true,
            error: null,
            data: response
        };


    } catch (error) {
        console.error('Error en action: update-abbreviation:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : "Error desconocido al actualizar la abreviación",
            data: null
        };
    }
}

