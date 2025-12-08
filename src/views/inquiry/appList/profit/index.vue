<template>
  <n-flex vertical>
    <n-card :bordered="false">
      <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset" />
    </n-card>
    <n-card :bordered="false">
      <BasicTable
        :columns="columns"
        :request="loadDataTable"
        :row-key="getRowKey"
        ref="actionRef"
        :actionColumn="actionColumn"
        canResize
        :striped="true"
      >
        <template #tableTitle>
          <n-button type="primary" @click="handleAdd">
            <template #icon>
              <n-icon>
                <PlusOutlined />
              </n-icon>
            </template>
            新建
          </n-button>
        </template>
      </BasicTable>

      <n-modal
        v-model:show="showModal"
        :show-icon="false"
        preset="dialog"
        :title="isEdit ? '编辑' : '新建'"
        style="width: 600px"
      >
        <n-form
          :model="formData"
          :rules="rules"
          ref="formRef"
          label-placement="left"
          :label-width="180"
          class="py-4"
        >
          <n-form-item label="广告网络" path="adNetwork">
            <!-- <n-select
              v-model:value="formData.adNetwork"
              :options="adNetworkOptions"
              placeholder="请选择广告网络"
            /> -->
            <n-radio-group v-model:value="formData.adNetwork">
              <n-space>
                <n-radio v-for="value in adNetworkOptions" :key="value.value" :value="value.value">
                  {{ value.label }}
                </n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="短视频" path="shortVideo">
            <n-input-number
              v-model:value="formData.shortVideo"
              placeholder="请输入"
              style="width: 100%"
              :min="0"
              :max="100"
              :show-button="false"
            >
              <template #suffix> % </template>
            </n-input-number>
          </n-form-item>
          <n-form-item label="激励" path="incentive">
            <n-input-number
              v-model:value="formData.incentive"
              placeholder="请输入"
              :show-button="false"
              style="width: 100%"
              :min="0"
              :max="100"
            >
              <template #suffix> % </template>
            </n-input-number>
          </n-form-item>
          <n-form-item label="Banner" path="banner">
            <n-input-number
              v-model:value="formData.banner"
              placeholder="请输入"
              :show-button="false"
              style="width: 100%"
              :min="0"
              :max="100"
            >
              <template #suffix> % </template>
            </n-input-number>
          </n-form-item>
          <n-form-item label="信息流" path="infoFlow">
            <n-input-number
              v-model:value="formData.infoFlow"
              placeholder="请输入"
              :show-button="false"
              style="width: 100%"
              :min="0"
              :max="100"
            >
              <template #suffix> % </template>
            </n-input-number>
          </n-form-item>
          <n-form-item label="插屏" path="interstitial">
            <n-input-number
              v-model:value="formData.interstitial"
              placeholder="请输入"
              :show-button="false"
              style="width: 100%"
              :min="0"
              :max="100"
            >
              <template #suffix> % </template>
            </n-input-number>
          </n-form-item>
          <n-form-item label="开屏" path="splash">
            <n-input-number
              v-model:value="formData.splash"
              placeholder="请输入"
              :show-button="false"
              style="width: 100%"
              :min="0"
              :max="100"
            >
              <template #suffix> % </template>
            </n-input-number>
          </n-form-item>
          <n-form-item label="短视频金币最大值" path="maxShortVideoCoin">
            <n-input-number
              v-model:value="formData.maxShortVideoCoin"
              placeholder="请输入"
              :show-button="false"
              style="width: 100%"
            />
          </n-form-item>
          <n-form-item label="激励金币最大值" path="maxIncentiveCoin">
            <n-input-number
              v-model:value="formData.maxIncentiveCoin"
              placeholder="请输入"
              :show-button="false"
              style="width: 100%"
            />
          </n-form-item>
          <n-form-item label="Banner金币最大值" path="maxBannerCoin">
            <n-input-number
              v-model:value="formData.maxBannerCoin"
              placeholder="请输入"
              :show-button="false"
              style="width: 100%"
            />
          </n-form-item>
          <n-form-item label="信息流金币最大值" path="maxInfoFlowCoin">
            <n-input-number
              v-model:value="formData.maxInfoFlowCoin"
              placeholder="请输入"
              :show-button="false"
              style="width: 100%"
            />
          </n-form-item>
          <n-form-item label="插屏金币最大值" path="maxInterstitialCoin">
            <n-input-number
              v-model:value="formData.maxInterstitialCoin"
              placeholder="请输入"
              :show-button="false"
              style="width: 100%"
            />
          </n-form-item>
          <n-form-item label="开屏金币最大值" path="maxSplashCoin">
            <n-input-number
              v-model:value="formData.maxSplashCoin"
              placeholder="请输入"
              :show-button="false"
              style="width: 100%"
            />
          </n-form-item>
          <n-form-item label="状态" path="status">
            <n-radio-group v-model:value="formData.status">
              <n-space>
                <n-radio :value="0">启用</n-radio>
                <n-radio :value="1">禁用</n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
        </n-form>

        <template #action>
          <n-space>
            <n-button @click="() => (showModal = false)">取消</n-button>
            <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
          </n-space>
        </template>
      </n-modal>
    </n-card>
  </n-flex>
</template>

<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
  import { columns, AdConfigData } from './columns';
  import { PlusOutlined } from '@vicons/antd';
  import { type FormRules } from 'naive-ui';
  import { getAdConfigList, addAdConfig, updateAdConfig } from '@/api/inquiry/profit';

  const getRowKey = (row: AdConfigData) => row.id;

  const adNetworkOptions = [
    { label: 'Gromore', value: 'gromore' },
    { label: '百度', value: 'baidu' },
  ];

  const statusOptions = [
    { label: '启用', value: 0 },
    { label: '禁用', value: 1 },
  ];

  const schemas: FormSchema[] = [
    {
      field: 'adNetwork',
      component: 'NSelect',
      label: '广告网络',
      componentProps: {
        placeholder: '请选择广告网络',
        options: adNetworkOptions,
      },
    },
    {
      field: 'status',
      component: 'NSelect',
      label: '状态',
      componentProps: {
        placeholder: '请选择状态',
        options: statusOptions,
      },
    },
  ];

  const [register, { getFieldsValue }] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas,
    size: 'small',
  });

  const rules: FormRules = {
    adNetwork: {
      required: true,
      trigger: ['blur', 'change'],
      message: '请选择广告网络',
    },
  };

  const formRef = ref();
  const actionRef = ref();
  const showModal = ref(false);
  const formBtnLoading = ref(false);
  const isEdit = ref(false);
  const currentId = ref<number | null>(null);

  const defaultFormData = {
    adNetwork: null as string | null,
    shortVideo: null as number | null,
    incentive: null as number | null,
    banner: null as number | null,
    infoFlow: null as number | null,
    interstitial: null as number | null,
    splash: null as number | null,
    maxShortVideoCoin: null as number | null,
    maxIncentiveCoin: null as number | null,
    maxBannerCoin: null as number | null,
    maxInfoFlowCoin: null as number | null,
    maxInterstitialCoin: null as number | null,
    maxSplashCoin: null as number | null,
    status: 0,
  };

  const formData = reactive({ ...defaultFormData });

  const loadDataTable = async (res: any) => {
    return await getAdConfigList({ ...getFieldsValue(), ...res });
  };

  const actionColumn = reactive({
    width: 120,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record: AdConfigData) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '编辑',
            onClick: handleEdit.bind(null, record),
          },
        ],
      });
    },
  });

  function handleAdd() {
    isEdit.value = false;
    currentId.value = null;
    Object.assign(formData, defaultFormData);
    showModal.value = true;
  }

  function handleEdit(record: AdConfigData) {
    isEdit.value = true;
    currentId.value = record.id;
    Object.assign(formData, {
      adNetwork: record.adNetwork,
      shortVideo: record.shortVideo,
      incentive: record.incentive,
      banner: record.banner,
      infoFlow: record.infoFlow,
      interstitial: record.interstitial,
      splash: record.splash,
      maxShortVideoCoin: record.maxShortVideoCoin,
      maxIncentiveCoin: record.maxIncentiveCoin,
      maxBannerCoin: record.maxBannerCoin,
      maxInfoFlowCoin: record.maxInfoFlowCoin,
      maxInterstitialCoin: record.maxInterstitialCoin,
      maxSplashCoin: record.maxSplashCoin,
      status: record.status,
    });
    showModal.value = true;
  }

  function reloadTable() {
    actionRef.value?.reload();
  }

  function handleSubmit() {
    reloadTable();
  }

  function handleReset() {
    reloadTable();
  }

  function confirmForm(e: Event) {
    e.preventDefault();
    formBtnLoading.value = true;
    formRef.value?.validate(async (errors: any) => {
      if (!errors) {
        try {
          if (isEdit.value) {
            await updateAdConfig({ id: currentId.value, ...formData });
          } else {
            await addAdConfig(formData);
          }
          window['$message'].success(isEdit.value ? '编辑成功' : '新建成功');
          showModal.value = false;
          reloadTable();
        } catch (error) {
          window['$message'].error('操作失败');
        }
      } else {
        window['$message'].error('请填写完整信息');
      }
      formBtnLoading.value = false;
    });
  }
</script>
