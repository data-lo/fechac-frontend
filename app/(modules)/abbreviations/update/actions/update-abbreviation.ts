"use server"
// 1.- Librerías externas
import { ObjectId } from "mongodb";

// 2.- Interfaces
import ActionResponse from "@/interfaces/action/action-response";
import { UpdateOne } from "@/interfaces/mongo/update-one";

// 3.- Acciones / Servicios

// import abbreviationExist from "../../actions/abbreviation-exist";

// 4.- Modelos
import getDb from "@/infrastructure/persistence/mongo/get-db";

export default async function updateAbbreviation(values: { _id: string, abbreviation: string, name: string, type: string }): Promise<ActionResponse<UpdateOne>> {
    try {
        const db = await getDb();

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

        const response: UpdateOne = await db.abbreviations.updateOne(filter, update);


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

