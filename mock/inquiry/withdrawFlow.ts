import { defineMock } from '@alova/mock';
import { faker } from '@faker-js/faker';
import { doCustomTimes, resultSuccess } from '../_util';
import dayjs from 'dayjs';

const withdrawStatuses = [1, 2, 3, 4];

function withdrawFlowList(pageSize: number) {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    const balanceBefore = faker.number.int({ min: 10000, max: 100000 });
    const withdrawAmount = faker.number.int({ min: 1000, max: 50000 });
    result.push({
      id: faker.number.int({ min: 1000, max: 9999 }),
      withdrawAmount: withdrawAmount,
      subsidyAmount: faker.number.int({ min: 0, max: 500 }),
      withdrawStatus: faker.helpers.arrayElement(withdrawStatuses),
      wechatBatchNo: `WX${faker.string.numeric(18)}`,
      alipayFlowNo: `ZFB${faker.string.numeric(20)}`,
      userId: faker.number.int({ min: 10001, max: 99999 }),
      nickname: faker.person.firstName(),
      balanceBefore: balanceBefore,
      balanceAfter: balanceBefore - withdrawAmount,
      finishTime: dayjs(faker.date.recent({ days: 30 })).format('YYYY-MM-DD HH:mm:ss'),
    });
  });
  return result;
}

export default defineMock({
  '/api/inquiry/withdraw_flow_list': ({ query }) => {
    const { page = 1, pageSize = 10 } = query;
    const list = withdrawFlowList(Number(pageSize));
    const count = 150;
    return resultSuccess({
      page: Number(page),
      pageSize: Number(pageSize),
      pageCount: Math.ceil(count / Number(pageSize)),
      itemCount: count,
      list,
    });
  },
});
