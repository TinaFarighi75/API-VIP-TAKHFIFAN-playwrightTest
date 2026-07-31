
//------------------GENERAL---------------------------

export type OverThanLimit = {
  msg: string;
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export type InvalidResponse400 = {
  msg: string;
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export type InvalidResponse404 = {
  message: string;
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export type InvalidResponse403 = {
  error: string;
  message: string;
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export type InvalidResponse401 = {
  error: string;
};