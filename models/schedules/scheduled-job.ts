import { ObjectId } from "mongodb"
import ScheduledJob from "./scheduled-job-document"


export default interface ScheduledJobDocument extends ScheduledJob {
    _id: ObjectId
}
