export function registerTemplate(
  appName: string,
  verifyCode: string
): string {
  return `[${appName}] Your verification code is ${verifyCode}`
}