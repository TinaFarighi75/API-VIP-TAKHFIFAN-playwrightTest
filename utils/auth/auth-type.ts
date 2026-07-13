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
    v3_id:  number | null;
    name:string
  };
  sub_businesses: Array<{
    id: number;
    name: string;
    v3_id: number;
  }>;
};

export type InvalidResponsenNotLogIn = {
  error: string;
};

export type InvalidResponsePermissionDeniedLogIn = {
  error: boolean;
  message: string;
};

export type InvalidResponseNotFoundLogIn = {
  message: string;
};
export type InvalidResponseByInvalidData={
  msg:string
}
//------------------LOGOUT---------------------------
export type ValidLogOutResponse = {
  msg: string;
};
export type InValidLogOutResponse = {
  msg: string;
};
//------------------LOGIN VIA OTP ---------------------------

export type ValidLogInResponseViaOtp = {
  otp_token: string;
};

export type InValidLogInResponseNotloggedInViaOtp = {
  error: string;
};

export type InValidLogInResponsePermissionDeniedViaOtp = {
  error: boolean;
  message: string;
};
export type InValidLogInResponseNotFoundViaOtp = {
  message: string;
};
export type InValidLogInResponseResponseStatusIs400ViaOtp = {
  msg: string;
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
export type InvalidCheckOtpErrorResponseStatusIs400 = {
  msg: string;
};

export type InvalidCheckOtpPermissionDenied = {
  error: boolean;
  message: string;
};

export type InvalidCheckOtpNoFound = {
  message: string;
};

export type InvalidCheckNotLoggedIn = {
  error: string;
};
//------------------REGISTER---------------------------
export type ValidRegisterUser = {
  otp_token: string;
};

export type InvalidRegisterUserError400 = {
  message: string;
};

export type InvalidRegisterUserError500 = {
  message: string;
  error_class_name: string;
};
//------------------GENERAL---------------------------

export type OverThanLimit = {
  message: string;
};
