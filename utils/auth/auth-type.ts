//------------------LOGIN---------------------------

export type ValidLoginResponse = {
  uuid: string;
  token: string;
  token_type: number;
  token_type_translation: string;
  ip: string;
  agent: string;
  login_url: string;
  renderer_token: string | null;
  last_activity: string;
  expires_at: string;
  created_at: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
    is_super_business: boolean;
  };
  business: {
    id: number | null;
    v3_id: number | null;
    name: string;
  };
  sub_businesses: Array<{
    id: number;
    name: string;
    v3_id: number;
  }>;
};

//------------------LOGOUT---------------------------
export type ValidLogOutResponse = {
  msg: string;
};

//------------------LOGIN VIA OTP ---------------------------

export type ValidLogInResponseViaOtp = {
  otp_token: string;
};

//------------------CHECK OTP---------------------------
export type ValidCheckOtp = {
  uuid: string;
  token: string;
  token_type: number;
  token_type_translation: string;
  ip: string;
  agent: string;
  login_url: string;
  renderer_token: unknown; // اگر همیشه null/string بود می‌تونیم دقیق‌ترش کنیم
  last_activity: string;
  expires_at: string;
  created_at: string;
  user: {
    id: number | undefined;
    email: string;
    name: string;
    role: string;
    is_super_business: boolean;
  };
  business: {
    id: number;
    v3_id: number;
    name: string;
  };
  sub_businesses: unknown[];
};
//------------------REGISTER---------------------------
export type ValidRegisterUser = {
  otp_token: string;
};

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
