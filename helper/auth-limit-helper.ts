import { Auth } from "../utils/auth/auth";
import { OverThanLimit } from "../utils/auth/auth-type";

export async function hitLoginLogoutUntilExpectedLimit(
  authApi: Auth,
  email: string,
  password: string,
  token: string,
  uuid: string,
  expectedMsg: string,
  maxTry = 6
): Promise<OverThanLimit> {
  for (let i = 0; i < maxTry; i++) {
    await authApi.loginRequest(email, password);

    const loginLimitedResult = await authApi.getOverThanLimit().catch(() => null);
    if (loginLimitedResult?.msg === expectedMsg) {
      return loginLimitedResult;
    }

    await authApi.logoutRequest(token, uuid);

    const logoutLimitedResult = await authApi.getOverThanLimit().catch(() => null);
    if (logoutLimitedResult?.msg === expectedMsg) {
      return logoutLimitedResult;
    }
  }

  throw new Error("Expected over-than-limit response was not returned.");
}

export async function expectLimitedLogin(
  authApi: Auth,
  email: string,
  password: string,
  expectedMsg: string
): Promise<OverThanLimit> {
  await authApi.loginRequest(email, password);

  const result = await authApi.getOverThanLimit();
  const status = await authApi.getStatus();

  if (status !== 400) {
    throw new Error(`Expected status 400 but got ${status}`);
  }

  if (result.msg !== expectedMsg) {
    throw new Error(`Expected msg "${expectedMsg}" but got "${result.msg}"`);
  }

  return result;
}

export async function expectSuccessfulLogin(
  authApi: Auth,
  email: string,
  password: string
): Promise<void> {
  await authApi.loginRequest(email, password);

  const status = await authApi.getStatus();
  if (status !== 200) {
    throw new Error(`Expected status 200 but got ${status}`);
  }
}

export async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
