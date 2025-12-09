<template>
  <n-flex vertical>
    <n-card :bordered="false">
      <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset" />
    </n-card>
    <n-card :bordered="false">
      <BasicTable
        :columns="columns"
        :request="loadDataTable"
        :row-key="(row) => row.id"
        ref="actionRef"
        canResize
        :striped="true"
      />
    </n-card>
  </n-flex>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicTable } from '@/components/Table';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
  import { columns, withdrawStatusMap } from './columns';
  import { getWithdrawFlowList } from '@/api/inquiry/withdrawFlow';

  const actionRef = ref();

  // 提现状态选项
  const withdrawStatusOptions = Object.entries(withdrawStatusMap).map(([value, item]) => ({
    label: item.text,
    value: Number(value),
  }));

  // 搜索表单配置
  const schemas: FormSchema[] = [
    {
      field: 'gameName',
      component: 'NSelect',
      label: '游戏',
      componentProps: {
        placeholder: '请选择游戏',
        options: [
          { label: '消消乐', value: '消消乐' },
          { label: '斗地主', value: '斗地主' },
          { label: '跑酷大作战', value: '跑酷大作战' },
        ],
      },
    },
    {
      field: 'withdrawStatus',
      component: 'NSelect',
      label: '提现状态',
      componentProps: {
        placeholder: '请选择提现状态',
        options: withdrawStatusOptions,
      },
    },
    {
      field: 'userId',
      component: 'NInput',
      label: '用户ID',
      componentProps: {
        placeholder: '请输入用户ID',
      },
    },
    {
      field: 'nickname',
      component: 'NInput',
      label: '用户昵称',
      componentProps: {
        placeholder: '请输入用户昵称',
      },
    },
    {
      field: 'timeRange',
      component: 'NDatePicker',
      label: '时间',
      componentProps: {
        type: 'daterange',
        clearable: true,
        placeholder: '请选择时间范围',
      },
    },
  ];

  const [register, { getFieldsValue }] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:5' },
    labelWidth: 80,
    schemas,
  });

  // 加载表格数据
  const loadDataTable = async (res: any) => {
    return await getWithdrawFlowList({ ...getFieldsValue(), ...res });
  };

  // 刷新表格
  function reloadTable() {
    actionRef.value.reload();
  }

  // 搜索提交
  function handleSubmit(_values: Recordable) {
    reloadTable();
  }

  // 重置搜索
  function handleReset(_values: Recordable) {
    reloadTable();
  }
</script>

<style lang="less" scoped></style>
