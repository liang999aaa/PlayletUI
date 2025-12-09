import { defineMock } from '@alova/mock';
import { faker } from '@faker-js/faker';
import { doCustomTimes, resultSuccess } from '../_util';
import dayjs from 'dayjs';

const appNames = ['消消乐', '斗地主', '跑酷大作战', '开心农场', '糖果消除'];
const adTypes = [1, 2, 3, 4, 5, 6];
const adNetworks = [1, 2, 3, 4, 5];

function abnormalDataList(pageSize: number) {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    result.push({
      id: faker.number.int({ min: 1000, max: 9999 }),
      userId: faker.number.int({ min: 10001, max: 99999 }),
      nickname: faker.person.firstName(),
      appName: faker.helpers.arrayElement(appNames),
      codeSlotId: `CS_${faker.string.alphanumeric(8).toUpperCase()}`,
      adType: faker.helpers.arrayElement(adTypes),
      adNetwork: faker.helpers.arrayElement(adNetworks),
      totalCount: faker.number.int({ min: 50, max: 500 }),
      ecpm: faker.number.float({ min: 5, max: 100, fractionDigits: 2 }),
      time: dayjs(faker.date.recent({ days: 30 })).format('YYYY-MM-DD HH:mm:ss'),
    });
  });
  return result;
}

export default defineMock({
  '/api/inquiry/abnormal_data_list': ({ query }) => {
    const { page = 1, pageSize = 10 } = query;
    const list = abnormalDataList(Number(pageSize));
    const count = 80;
    return resultSuccess({
      page: Number(page),
      pageSize: Number(pageSize),
      pageCount: Math.ceil(count / Number(pageSize)),
      itemCount: count,
      list,
    });
  },
});
