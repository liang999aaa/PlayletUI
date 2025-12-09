import { h } from 'vue';
import { NTag } from 'naive-ui';
import { BasicColumn } from '@/components/Table';

export interface WithdrawRecordData {
  id: number;
  userId: number;
  nickname: string;
  userLevel: number;
  withdrawAmount: number;
  gameName: string;
  subsidyAmount: number;
  withdrawType: number;
  totalWithdraw: number;
  withdrawTime: string;
  registerTime: string;
  auditor: string;
  remark: string;
  withdrawStatus: number;
}

export const userLevelMap: Record<number, string> = {
  1: 'V1',
  2: 'V2',
  3: 'V3',
};

export const withdrawTypeMap: Record<number, string> = {
  1: '金币提现',
  2: '师傅提现',
  3: '团长提现',
};

export const withdrawStatusMap: Record<number, { text: string; type: string }> = {
  1: { text: '提现成功', type: 'success' },
  2: { text: '待确认收款', type: 'warning' },
  3: { text: '审核拒绝', type: 'error' },
  4: { text: '打款失败', type: 'error' },
};

export const columns: BasicColumn<WithdrawRecordData>[] = [
  {
    title: '用户ID',
    key: 'userId',
    width: 100,
  },
  {
    title: '用户昵称',
    key: 'nickname',
    width: 120,
  },
  {
    title: '用户等级',
    key: 'userLevel',
    width: 80,
    render(row) {
      return h(
        NTag,
        { type: 'info', size: 'small' },
        { default: () => userLevelMap[row.userLevel] || '未知' }
      );
    },
  },
  {
    title: '提现金额(元)',
    key: 'withdrawAmount',
    width: 120,
    render(row) {
      return `¥${row.withdrawAmount.toFixed(2)}`;
    },
  },
  {
    title: '游戏名称',
    key: 'gameName',
    width: 120,
  },
  {
    title: '补贴金额(元)',
    key: 'subsidyAmount',
    width: 120,
    render(row) {
      return `¥${row.subsidyAmount.toFixed(2)}`;
    },
  },
  {
    title: '提现类型',
    key: 'withdrawType',
    width: 100,
    render(row) {
      return withdrawTypeMap[row.withdrawType] || '未知';
    },
  },
  {
    title: '累计提现(元)',
    key: 'totalWithdraw',
    width: 120,
    render(row) {
      return `¥${row.totalWithdraw.toFixed(2)}`;
    },
  },
  {
    title: '提现时间',
    key: 'withdrawTime',
    width: 180,
  },
  {
    title: '注册时间',
    key: 'registerTime',
    width: 180,
  },
  {
    title: '审核人',
    key: 'auditor',
    width: 100,
  },
  {
    title: '备注',
    key: 'remark',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '提现状态',
    key: 'withdrawStatus',
    width: 120,
    render(row) {
      const item = withdrawStatusMap[row.withdrawStatus] || { text: '未知', type: 'default' };
      return h(
        NTag,
        { type: item.type as any, size: 'small' },
        { default: () => item.text }
      );
    },
  },
];
