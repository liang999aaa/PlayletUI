import { h } from 'vue';
import { NTag } from 'naive-ui';
import { BasicColumn } from '@/components/Table';

export interface AdConfigData {
  id: number;
  adNetwork: string;
  shortVideo: number;
  incentive: number;
  banner: number;
  infoFlow: number;
  interstitial: number;
  splash: number;
  maxShortVideoCoin: number;
  maxIncentiveCoin: number;
  maxBannerCoin: number;
  maxInfoFlowCoin: number;
  maxInterstitialCoin: number;
  maxSplashCoin: number;
  status: number;
}

const adNetworkMap: Record<string, string> = {
  gromore: 'Gromore',
  baidu: '百度',
};

const statusMap: Record<number, { label: string; type: 'success' | 'error' }> = {
  0: { label: '启用', type: 'success' },
  1: { label: '禁用', type: 'error' },
};

export const columns: BasicColumn<AdConfigData>[] = [
  {
    title: '广告网络',
    key: 'adNetwork',
    width: 100,
    align: 'center',
    render(record) {
      return adNetworkMap[record.adNetwork] || record.adNetwork;
    },
  },
  {
    title: '短视频收益获取比例(%)',
    key: 'shortVideo',
    align: 'center',
    width: 160,
  },
  {
    title: '短视频金币最大值',
    key: 'maxShortVideoCoin',
    align: 'center',
    width: 140,
  },
  {
    title: '激励收益获取比例(%)',
    key: 'incentive',
    align: 'center',
    width: 160,
  },
  {
    title: '激励金币最大值',
    key: 'maxIncentiveCoin',
    align: 'center',
    width: 130,
  },
  {
    title: 'Banner收益获取比例(%)',
    key: 'banner',
    align: 'center',
    width: 160,
  },
  {
    title: 'Banner金币最大值',
    key: 'maxBannerCoin',
    align: 'center',
    width: 140,
  },
  {
    title: '信息流收益获取比例(%)',
    key: 'infoFlow',
    align: 'center',
    width: 160,
  },
  {
    title: '信息流金币最大值',
    key: 'maxInfoFlowCoin',
    align: 'center',
    width: 140,
  },
  {
    title: '插屏收益获取比例(%)',
    key: 'interstitial',
    align: 'center',
    width: 160,
  },
  {
    title: '插屏金币最大值',
    key: 'maxInterstitialCoin',
    align: 'center',
    width: 130,
  },
  {
    title: '开屏收益获取比例(%)',
    key: 'splash',
    align: 'center',
    width: 160,
  },
  {
    title: '开屏金币最大值',
    key: 'maxSplashCoin',
    align: 'center',
    width: 130,
  },
  {
    title: '状态',
    key: 'status',
    width: 80,
    align: 'center',
    render(record) {
      const status = statusMap[record.status] || statusMap[0];
      return h(NTag, { type: status.type }, { default: () => status.label });
    },
  },
];
