import { h } from 'vue';
import { NTag } from 'naive-ui';
import { BasicColumn } from '@/components/Table';

export interface InviteData {
  id: number;
  num1: number;
  num2: number;
  status: number;
}

const statusMap: Record<number, { label: string; type: 'success' | 'error' }> = {
  0: { label: '启用', type: 'success' },
  1: { label: '禁用', type: 'error' },
};

export const columns: BasicColumn<InviteData>[] = [
  {
    title: '名字',
    key: 'num1',
    width: 120,
    align: 'center',
    render(record) {
      return `累计提现${record.num1}元`;
    },
  },
  {
    title: '描述',
    key: 'num2',
    width: 120,
    align: 'center',
    render(record) {
      return `徒弟累计提现${record.num1}元，师傅提现${record.num2}元`;
    },
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render(record) {
      const status = statusMap[record.status] || statusMap[0];
      return h(NTag, { type: status.type }, { default: () => status.label });
    },
    align: 'center',
  },
];
