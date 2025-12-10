import { Alova } from '@/utils/http/alova/index';

/**
 * @description: 角色列表
 * @param {string} roleName - 角色名称
 * @param {number} roleStatus - 角色状态
 * @param {number} pageSize - 每页数量
 * @param {number} pageIndex - 当前页码
 */
export function getRoleList(params) {
  return Alova.Get('/am/v1/auths/role/list', { params });
}
