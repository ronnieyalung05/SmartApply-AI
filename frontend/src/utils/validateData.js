export function validateData(preferences, resume, jobDescriptions) {
  const MAX_CHARACTERS = 12000;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_JOB_DESCRIPTIONS = 50;

  try {
    if (!preferences || typeof preferences !== "object") {
      throw new Error("Invalid preferences data");
    }

    if (!Array.isArray(jobDescriptions)) {
      throw new Error("Invalid job descriptions data");
    }

    if (!resume || !(resume instanceof File)) {
      return { isValid: false, message: "Please upload a valid resume." };
    }

    if (resume.size > MAX_FILE_SIZE) {
      return { isValid: false, message: "Resume file is too large (max 5MB)." };
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "application/rtf",
    ];

    if (!allowedTypes.includes(resume.type)) {
      return { isValid: false, message: "Invalid resume file type." };
    }

    if (jobDescriptions.length === 0) {
      return { isValid: false, message: "No job descriptions provided." };
    }

    if (jobDescriptions.length > MAX_JOB_DESCRIPTIONS) {
      return { isValid: false, message: "Too many job descriptions (max 50)." };
    }

    for (let i = 0; i < jobDescriptions.length; i++) {
      const job = jobDescriptions[i];
      if (!job.title || !job.description) {
        return { isValid: false, message: `Job ${i + 1} is missing data.` };
      }
      if (job.description.length > MAX_CHARACTERS) {
        return {
          isValid: false,
          message: `Job ${
            i + 1
          } description is too long (max ${MAX_CHARACTERS}).`,
        };
      }
    }

    return { isValid: true };
  } catch (err) {
    return { isValid: false, message: `Validation error: ${err.message}` };
  }
}
