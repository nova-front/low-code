/**
 * 延迟多少毫秒后继续执行
 * @return {Promise}
 */

export function sleep(time: number): Promise<any> {
  return new Promise((resolve) => setTimeout(resolve, time));
}
