import { Alova } from '@/utils/http/alova/index';

// 获取提现审核记录列表
export function getWithdrawRecordList(params: any) {
  return Alova.Get('/inquiry/withdraw_record_list', { params });
}
