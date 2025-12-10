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
        :scroll-x="1200"
        :striped="true"
      />
    </n-card>
  </n-flex>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicTable } from '@/components/Table';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
  import { columns } from './columns';
  import { getOperationLogList } from '@/api/permission/operationLog';
  import { formatDate } from '@/utils/dateUtil';

  const schemas: FormSchema[] = [
    {
      field: 'userID',
      component: 'NInput',
      label: '用户名',
      componentProps: {
        placeholder: '请输入用户名',
      },
    },
    {
      field: 'title',
      component: 'NInput',
      label: '标题',
      componentProps: {
        placeholder: '请输入标题',
      },
    },
    {
      field: 'ip',
      component: 'NInput',
      label: 'IP地址',
      componentProps: {
        placeholder: '请输入IP地址',
      },
    },
    {
      field: 'dateRange',
      component: 'NDatePicker',
      label: '时间范围',
      componentProps: {
        type: 'daterange',
        clearable: true,
      },
    },
  ];

  const [register, { getFieldsValue }] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:5 2xl:5' },
    labelWidth: 80,
    schemas,
    size: 'small',
  });

  const actionRef = ref();

  // 搜索
  const handleSubmit = (_val) => {
    reloadTable();
  };

  // 重置
  const handleReset = (_val) => {
    reloadTable();
  };

  // 刷新表格
  function reloadTable() {
    actionRef.value.reload();
  }

  // 获取列表数据
  const loadDataTable = async (res) => {
    const formValues = getFieldsValue();
    // 处理时间范围
    let start = '';
    let end = '';
    if (formValues.dateRange && formValues.dateRange.length === 2) {
      start = formatDate(formValues.dateRange[0]);
      end = formatDate(formValues.dateRange[1]);
    }
    const params = {
      pageSize: res.pageSize,
      pageIndex: res.pageIndex,
      userID: formValues.userID || '',
      title: formValues.title || '',
      ip: formValues.ip || '',
      start,
      end,
    };
    return await getOperationLogList(params);
  };
</script>
<style lang="less" scoped></style>