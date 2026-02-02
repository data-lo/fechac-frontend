"use server";
// External libraries
import { ObjectId } from "mongodb";

// Functions / utilities
import { addDays } from "@/functions/add-days";
import { getDaysByPeriodicity } from "@/functions/get-days-by-periodicity";

// Enums
import { Periodicity } from "@/enums/periodicity";

// Actions / services
import insertScheduler from "./insert-scheduler";
import updateScheduler from "./update-scheduler";
import countScheduledJobs from "./count-schedules";
import getLatestScheduleExecution from "./get-latest-scheduler";

export default async function upsertScheduler(
  periodicity: Periodicity
): Promise<{ success: boolean; message: string }> {
  try {
    const successMessage = "Se ha configurado correctamente la periodicidad";

    const scheduledJobs = await countScheduledJobs();

    // First schedule
    if (scheduledJobs === 0) {
      const document = {
        is_last_schedule: true,
        schedule_job_number: 1,
        last_run_at: null,
        created_at: new Date(),
        updated_at: new Date(),
        periodicity,
        is_report_ready: false,
        next_run_at: addDays(getDaysByPeriodicity(periodicity)),
      };

      await insertScheduler(document);

      return {
        success: true,
        message: successMessage,
      };
    }

    const lastSchedule = await getLatestScheduleExecution();

    if (!lastSchedule) {
      return {
        success: false,
        message: "No se encontró una ejecución previa del scheduler",
      };
    }

    const filter = { _id: new ObjectId(lastSchedule._id) };

    const update = {
      periodicity,
      updated_at: new Date(),
      nextRun_at: addDays(getDaysByPeriodicity(periodicity)),
    };

    const response = await updateScheduler(filter, update);

    if (response.matchedCount > 0) {
      return {
        success: true,
        message: successMessage,
      };
    }

    return {
      success: false,
      message: "No se pudo actualizar la periodicidad",
    };
  } catch (error) {
    console.error("[upsertScheduler]", error);

    return {
      success: false,
      message: "Ocurrió un error al crear o actualizar el scheduler",
    };
  }
}