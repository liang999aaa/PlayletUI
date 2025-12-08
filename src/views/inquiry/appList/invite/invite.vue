<template>
  <n-flex vertical>
    <n-card :bordered="false">
      <!-- <template #header>
          <div class="flex tems-center">
            <div @click="() => $router.back()">< 返回</div>
            <div class="ml-4">设置邀请奖励任务</div>
          </div>
        </template> -->
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
            新增
          </n-button>
        </template>
      </BasicTable>

      <n-modal
        v-model:show="showModal"
        :show-icon="false"
        preset="dialog"
        :title="isEdit ? '编辑' : '新增'"
      >
        <n-form
          :model="formParams"
          :rules="rules"
          ref="formRef"
          label-placement="left"
          :label-width="140"
          class="py-4"
        >
          <n-form-item label="徒弟累计提现(元)" path="num1">
            <n-input-number
              placeholder="请输入"
              v-model:value="formParams.num1"
              :show-button="false"
              style="width: 100%"
            />
          </n-form-item>
          <n-form-item label="师傅得(元)" path="num2">
            <n-input-number
              placeholder="请输入"
              v-model:value="formParams.num2"
              :show-button="false"
              style="width: 100%"
            />
          </n-form-item>
          <n-form-item label="状态" path="status">
            <n-radio-group v-model:value="formParams.status">
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
  import { columns, InviteData } from './columns';
  import { PlusOutlined } from '@vicons/antd';
  import { type FormRules } from 'naive-ui';

  const getRowKey = (row: InviteData) => row.id;

  const rules: FormRules = {
    num1: {
      type: 'number',
      required: true,
      trigger: ['blur', 'change'],
      message: '请输入数字1',
    },
    num2: {
      type: 'number',
      required: true,
      trigger: ['blur', 'change'],
      message: '请输入数字2',
    },
    status: {
      type: 'number',
      required: true,
      trigger: ['blur', 'change'],
      message: '请选择状态',
    },
  };

  const formRef = ref();
  const actionRef = ref();
  const showModal = ref(false);
  const formBtnLoading = ref(false);
  const isEdit = ref(false);
  const currentId = ref<number | null>(null);

  const defaultFormParams = {
    num1: null as number | null,
    num2: null as number | null,
    status: 0,
  };

  const formParams = reactive({ ...defaultFormParams });

  // 模拟数据
  const mockData: InviteData[] = [
    { id: 1, num1: 100, num2: 200, status: 0 },
    { id: 2, num1: 150, num2: 300, status: 1 },
    { id: 3, num1: 200, num2: 400, status: 0 },
  ];

  const loadDataTable = async () => {
    return {
      list: mockData,
      pageCount: 1,
      page: 1,
      pageSize: 10,
    };
  };

  const actionColumn = reactive({
    width: 150,
    title: '操作',
    key: 'action',
    fixed: 'right',
    align: 'center',
    render(record: InviteData) {
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
    Object.assign(formParams, defaultFormParams);
    showModal.value = true;
  }

  function handleEdit(record: InviteData) {
    isEdit.value = true;
    currentId.value = record.id;
    formParams.num1 = record.num1;
    formParams.num2 = record.num2;
    formParams.status = record.status;
    showModal.value = true;
  }

  function reloadTable() {
    actionRef.value?.reload();
  }

  function confirmForm(e: Event) {
    e.preventDefault();
    formBtnLoading.value = true;
    formRef.value?.validate((errors: any) => {
      if (!errors) {
        window['$message'].success(isEdit.value ? '编辑成功' : '新建成功');
        setTimeout(() => {
          showModal.value = false;
          reloadTable();
        });
      } else {
        window['$message'].error('请填写完整信息');
      }
      formBtnLoading.value = false;
    });
  }
</script>
