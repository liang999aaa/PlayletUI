import { Alova } from '@/utils/http/alova/index';

// 获取异常数据列表
export function getAbnormalDataList(params: any) {
  return Alova.Get('/inquiry/abnormal_data_list', { params });
}
