import { h } from 'vue';
import { NTag } from 'naive-ui';
import { BasicColumn } from '@/components/Table';

export interface WithdrawFlowData {
  id: number;
  withdrawAmount: number;
  subsidyAmount: number;
  withdrawStatus: number;
  wechatBatchNo: string;
  alipayFlowNo: string;
  userId: number;
  nickname: string;
  balanceBefore: number;
  balanceAfter: number;
  finishTime: string;
}

export const withdrawStatusMap: Record<number, { text: string; type: string }> = {
  1: { text: '提现成功', type: 'success' },
  2: { text: '待确认收款', type: 'warning' },
  3: { text: '审核拒绝', type: 'error' },
  4: { text: '打款失败', type: 'error' },
};

export const columns: BasicColumn<WithdrawFlowData>[] = [
  {
    title: '提现金额(分)',
    key: 'withdrawAmount',
    width: 120,
  },
  {
    title: '补贴金额(分)',
    key: 'subsidyAmount',
    width: 120,
  },
  {
    title: '提现状态',
    key: 'withdrawStatus',
    width: 120,
    render(row) {
      const item = withdrawStatusMap[row.withdrawStatus] || { text: '未知', type: 'default' };
      return h(NTag, { type: item.type as any, size: 'small' }, { default: () => item.text });
    },
  },
  {
    title: '微信批次单号',
    key: 'wechatBatchNo',
    width: 200,
    ellipsis: { tooltip: true },
  },
  {
    title: '支付宝流水号',
    key: 'alipayFlowNo',
    width: 200,
    ellipsis: { tooltip: true },
  },
  {
    title: '提现人用户ID',
    key: 'userId',
    width: 120,
  },
  {
    title: '提现人昵称',
    key: 'nickname',
    width: 120,
  },
  {
    title: '提现前账户(金额)',
    key: 'balanceBefore',
    width: 150,
  },
  {
    title: '提现后账户(金额)',
    key: 'balanceAfter',
    width: 150,
  },
  {
    title: '完成时间',
    key: 'finishTime',
    width: 180,
  },
];
