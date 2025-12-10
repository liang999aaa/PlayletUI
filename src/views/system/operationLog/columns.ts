import { BasicColumn } from '@/components/Table';

export interface OperationLogData {
  id: number;
  title: string;
  url: string;
  ip: string;
  addTime: string;
  adminid: number | null;
  remarks: string | null;
  typeID: number;
  userID: string | null;
  useragent: string;
}

export const columns: BasicColumn<OperationLogData>[] = [
  {
    title: 'ID',
    key: 'id',
    width: 80,
  },
  {
    title: '用户名',
    key: 'userID',
    width: 100,
  },
  {
    title: '标题',
    key: 'title',
    width: 200,
    ellipsis: { tooltip: true },
  },
  {
    title: 'URL',
    key: 'url',
    width: 250,
    ellipsis: { tooltip: true },
  },
  {
    title: 'IP',
    key: 'ip',
    width: 130,
  },
  {
    title: 'Browser',
    key: 'useragent',
    width: 200,
    ellipsis: { tooltip: true },
    render(record) {
      return record.useragent?.split(' ')[0];
    },
  },
  {
    title: '操作时间',
    key: 'addTime',
    width: 180,
  },
];
