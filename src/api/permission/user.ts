import { Alova } from '@/utils/http/alova/index';

/**
 * @description: 管理员列表
 * @param {number} pageSize - 每页数量
 * @param {number} pageIndex - 当前页码
 * @param {string} userName - 用户昵称
 * @param {string} mobile - 手机号
 * @param {number} userStatus - 角色状态(默认全部) -1：全部； 1:启用； 2:禁用
 * @param {string($date-time)} start - 开始时间
 * @param {string($date-time)} end - 结束时间
 */
export function getAdminslist(params) {
  return Alova.Get<InResult>('/am/v1/auths/admins/list', {
    params,
  });
}
