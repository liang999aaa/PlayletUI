import { defineMock } from '@alova/mock';
import { resultSuccess } from '../_util';

// Mock广告配置数据
const adConfigList: any[] = [
  {
    id: 1,
    adNetwork: 'gromore',
    shortVideo: 100,
    incentive: 200,
    banner: 50,
    infoFlow: 80,
    interstitial: 120,
    splash: 150,
    maxShortVideoCoin: 1000,
    maxIncentiveCoin: 2000,
    maxBannerCoin: 500,
    maxInfoFlowCoin: 800,
    maxInterstitialCoin: 1200,
    maxSplashCoin: 1500,
    status: 0,
  },
  {
    id: 2,
    adNetwork: 'baidu',
    shortVideo: 80,
    incentive: 150,
    banner: 40,
    infoFlow: 60,
    interstitial: 100,
    splash: 130,
    maxShortVideoCoin: 800,
    maxIncentiveCoin: 1500,
    maxBannerCoin: 400,
    maxInfoFlowCoin: 600,
    maxInterstitialCoin: 1000,
    maxSplashCoin: 1300,
    status: 1,
  },
];

let nextId = 3;

export default defineMock({
  // 获取广告配置列表
  '/api/inquiry/ad_config_list': ({ query }) => {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;

    let filteredList = [...adConfigList];

    if (query.adNetwork) {
      filteredList = filteredList.filter((item) => item.adNetwork === query.adNetwork);
    }
    if (query.status !== undefined && query.status !== '' && query.status !== null) {
      filteredList = filteredList.filter((item) => item.status === Number(query.status));
    }

    const total = filteredList.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const list = filteredList.slice(start, end);

    return resultSuccess({
      page,
      pageSize,
      pageCount: Math.ceil(total / pageSize),
      list,
      total,
    });
  },

  // 新增广告配置
  '[POST]/api/inquiry/ad_config_add': ({ data }) => {
    const newItem = {
      id: nextId++,
      ...data,
    };
    adConfigList.push(newItem);
    return resultSuccess(newItem);
  },

  // 编辑广告配置
  '[POST]/api/inquiry/ad_config_update': ({ data }) => {
    const index = adConfigList.findIndex((item) => item.id === data.id);
    if (index !== -1) {
      adConfigList[index] = { ...adConfigList[index], ...data };
      return resultSuccess(adConfigList[index]);
    }
    return resultSuccess(null);
  },
});
