import { getRequestConfig } from "next-intl/server";

const locales = ["ko", "en"];

export default getRequestConfig(({ locale }) => {
  if (!locale || !locales.includes(locale)) {
    locale = "ko";
  }

  return {
    locale,
    messages: require(`../messages/${locale}.json`),
  };
});
