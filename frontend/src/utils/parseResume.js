// TODO: this needs to be an actual resume parse based on file type. also try catch block
export async function parseResume(resumeFile) {
  if (resumeFile.type === "text/plain") {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(resumeFile);
    });
  } else {
    return `[${resumeFile.type} file: ${resumeFile.name}]`;
  }
}
