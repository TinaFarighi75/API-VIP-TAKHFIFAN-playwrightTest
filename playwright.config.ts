import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  
  /* تنظیمات کلی: تست‌ها در حالت عادی موازی هستند مگر اینکه در پروژه مشخص شود */
  fullyParallel: true,
  
  /* اگر در CI بودی، تست‌هایی که با .only باقی مانده‌اند باعث شکست شدن بیلد شوند */
  forbidOnly: !!process.env.CI,

  /* ریترای: در CI دو بار تلاش مجدد کن، در لوکال صفر (برای اینکه سریع بفهمی مشکل کجاست) */
  retries: process.env.CI ? 2 : 0,

  /* ورکرها: در CI برای اطمینان از پایداری، ۱ ورکر استفاده کن */
  workers: process.env.CI ? 1 : undefined,

  /* گزارش‌دهی */
  reporter: 'html',

  use: {
    /* ضبط Trace فقط برای اولین بارِ ریترای (بسیار مفید برای دیباگ API) */
    trace: 'on-first-retry',
  },

  projects: [
    /* 
       پروژه مخصوص تست‌های API 
       این پروژه فقط تست‌های داخل پوشه API را اجرا می‌کند (اگر مسیر را اصلاح کنی)
       و به صورت تک‌ورکر و غیرموازی اجرا می‌شود.
    */
    {
      name: 'Api-Testing',
      // اگر تست‌های API در پوشه خاصی هستند (مثلاً tests/api)، این خط را فعال کن:
      // testMatch: /.*\.api\.spec\.ts/, 
      
      // غیرفعال کردن موازی‌سازی برای پایداری تست‌های API
      fullyParallel: false,
      workers: 1, 

      use: {
        // برای API نیازی به Device یا مرورگر نیست، فقط هدرها یا baseURL کافی است
        // baseURL: 'https://your-api-url.com', 
      },
    },

    /* 
       اگر در آینده تست UI اضافه کردی، این بخش را فعال می‌کنی 
       و تست‌های UI با سرعت بالا و موازی اجرا می‌شوند
    */
    /*
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    */
  ],
});
