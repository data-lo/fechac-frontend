export enum FileStatus {
    UNPROCESSED = "UNPROCESSED",

    SELECTED_FOR_TRANSFER = "SELECTED_FOR_TRANSFER",
    NOT_SELECTED_FOR_TRANSFER = "NOT_SELECTED_FOR_TRANSFER",

    // Al comparar el documento y ver si hay un proyecto relacionado, se guarda
    SAVED_IN_MINIO = "SAVED_IN_MINIO",

    // Se comparó contra los criterios y se encontraron resultados exitosos
    MATCH_RESULTS_READY = "MATCH_RESULTS_READY",

    // El peso calculado entre file_name y path no superó el umbral (85%)
    // Por lo tanto, se debe clasificar mediante keywords
    WEIGHT_BELOW_THRESHOLD = "WEIGHT_BELOW_THRESHOLD",

    TEXT_EXTRACTED = "TEXT_EXTRACTED",

    // El documento necesita revisión manual por no cumplir condiciones automáticas
    REQUIRES_HUMAN_REVIEW = "REQUIRES_HUMAN_REVIEW",

    // No fue posible clasificar el documento ni por criterios ni por keywords
    NOT_CLASSIFIED = "NOT_CLASSIFIED",

    // El documento ya fue clasificado y pasa a la etapa de renombrado
    READY_FOR_RENAMING = "READY_FOR_RENAMING",

    // El documento se renombró exitosamente
    RENAMED = "RENAMED",

    SAVED_IN_SHAREPOINT = "SAVED_IN_SHAREPOINT",
}

