import getCollection from "@/lib/mongodb";

export default async function getScheduler() {
    const collection = await getCollection("schedules")

    const schedule = await collection.findOne({
        lastExecution: true,
    })


}