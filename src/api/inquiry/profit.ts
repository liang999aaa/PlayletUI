import { Alova } from '@/utils/http/alova/index';

/**
 * @description: 获取广告配置列表
 */
export function getAdConfigList(params: any) {
  return Alova.Get('/inquiry/ad_config_list', {
    params,
  });
}

/**
 * @description: 新增广告配置
 */
export function addAdConfig(data: any) {
  return Alova.Post('/inquiry/ad_config_add', data);
}

/**
 * @description: 编辑广告配置
 */
export function updateAdConfig(data: any) {
  return Alova.Post('/inquiry/ad_config_update', data);
}
