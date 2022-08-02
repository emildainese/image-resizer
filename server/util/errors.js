export const except = (msg, ...args) => {
  throw new Error(msg);
};

//--------------------------------------------------------------------------------------
// General errors messages
//--------------------------------------------------------------------------------------

export const ALL_PROJECT_DELETED = `You probably have not uploaded any images yet, or you have deleted all projects, if not, 
try to search by date and file name in the appropriate fields above.`;

export const NO_PROJECTS_AVAILABLE = `No projects available, please upload some photos.`;
