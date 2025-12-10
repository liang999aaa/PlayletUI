import { Alova } from '@/utils/http/alova/index';

/**
 * @description: 管理员日志列表
 * @param {number} pageSize - 每页数量
 * @param {number} pageIndex - 当前页码
 * @param {string} userID - 用户名
 * @param {string} title - 标题
 * @param {string} ip - IP地址
 * @param {string} start - 开始时间
 * @param {string} end - 结束时间
 */
export function getOperationLogList(params) {
  return Alova.Get<InResult>('/am/v1/auths/operationlogs/list', {
    params,
  });
}
