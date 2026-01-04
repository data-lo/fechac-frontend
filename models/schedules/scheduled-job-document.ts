import { ObjectId } from "mongodb"
import ScheduledJob from "./scheduled-job"


export default interface ScheduledJobDocument extends ScheduledJob {
    _id: ObjectId
}
