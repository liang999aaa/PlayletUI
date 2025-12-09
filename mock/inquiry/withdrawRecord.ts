import { defineMock } from '@alova/mock';
import { faker } from '@faker-js/faker';
import { doCustomTimes, resultSuccess } from '../_util';
import dayjs from 'dayjs';

const gameNames = ['消消乐', '斗地主', '跑酷大作战', '开心农场', '糖果消除'];
const userLevels = [1, 2, 3];
const withdrawTypes = [1, 2, 3];
const withdrawStatuses = [1, 2, 3, 4];
const auditors = ['张三', '李四', '王五', '系统自动'];

function withdrawRecordList(pageSize: number) {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    result.push({
      id: faker.number.int({ min: 1000, max: 9999 }),
      userId: faker.number.int({ min: 10001, max: 99999 }),
      nickname: faker.person.firstName(),
      userLevel: faker.helpers.arrayElement(userLevels),
      withdrawAmount: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
      gameName: faker.helpers.arrayElement(gameNames),
      subsidyAmount: faker.number.float({ min: 0, max: 50, fractionDigits: 2 }),
      withdrawType: faker.helpers.arrayElement(withdrawTypes),
      totalWithdraw: faker.number.float({ min: 100, max: 5000, fractionDigits: 2 }),
      withdrawTime: dayjs(faker.date.recent({ days: 30 })).format('YYYY-MM-DD HH:mm:ss'),
      registerTime: dayjs(faker.date.past({ years: 1 })).format('YYYY-MM-DD HH:mm:ss'),
      auditor: faker.helpers.arrayElement(auditors),
      remark: faker.helpers.arrayElement(['正常提现', '首次提现', '大额提现需审核', '']),
      withdrawStatus: faker.helpers.arrayElement(withdrawStatuses),
    });
  });
  return result;
}

export default defineMock({
  '/api/inquiry/withdraw_record_list': ({ query }) => {
    const { page = 1, pageSize = 10 } = query;
    const list = withdrawRecordList(Number(pageSize));
    const count = 120;
    return resultSuccess({
      page: Number(page),
      pageSize: Number(pageSize),
      pageCount: Math.ceil(count / Number(pageSize)),
      itemCount: count,
      list,
    });
  },
});
