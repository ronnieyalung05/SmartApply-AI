// TODO: generate an actual prompt, and force the model to use a template
export function createPrompts(resumeText, preferences, jobDescriptions) {
  return jobDescriptions.map((job, index) => {
    const prompt = `Please analyze the following job description against my resume and preferences:

RESUME:
${resumeText}

PREFERENCES:
- Pay Range: ${preferences.payRange.min} - ${preferences.payRange.max}
- Work Arrangement: ${preferences.workArrangement.join(", ")}
- Job Type: ${preferences.jobType.join(", ")}
- Other Preferences: ${preferences.otherPreferences}

JOB TITLE: ${job.title}

JOB DESCRIPTION:
${job.description}

Please provide:
1. Match score (1-10)
2. Pros and cons
3. Recommendation to prioritize?
4. Resume gaps for this role`;

    return { prompt, job, index };
  });
}
