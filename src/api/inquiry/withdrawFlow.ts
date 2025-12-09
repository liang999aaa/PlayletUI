import { Alova } from '@/utils/http/alova/index';

// 获取提现流水列表
export function getWithdrawFlowList(params: any) {
  return Alova.Get('/inquiry/withdraw_flow_list', { params });
}
