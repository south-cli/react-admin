import type { FormData } from '#/form';
import type { PagePermission, TableOptions } from '#/public';
import { useCallback, useEffect, useState } from 'react';
import { searchList, tableColumns } from './model';
import { message } from 'antd';
import { usePublicStore } from '@/stores';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { checkPermission } from '@/utils/permissions';
import { useCommonStore } from '@/hooks/useCommonStore';
import { UpdateBtn, DeleteBtn } from '@/components/Buttons';
import { getArticlePage, deleteArticle } from '@/servers/content/article';
import { INIT_PAGINATION } from '@/utils/config';
import BaseContent from '@/components/Content/BaseContent';
import BaseSearch from '@/components/Search/BaseSearch';
import BaseTable from '@/components/Table/BaseTable';
import BasePagination from '@/components/Pagination/BasePagination';
import BaseCard from '@/components/Card/BaseCard';

// 当前行数据
interface RowData {
  id: string;
}

function Page() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { permissions } = useCommonStore();
  const [isFetch, setFetch] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState<FormData>({});
  const [page, setPage] = useState(INIT_PAGINATION.page);
  const [pageSize, setPageSize] = useState(INIT_PAGINATION.pageSize);
  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState<FormData[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const setRefreshPage = usePublicStore(state => state.setRefreshPage);
  const isRefreshPage = usePublicStore(state => state.isRefreshPage);

  // 权限前缀
  const permissionPrefix = '/content/article';

  // 权限
  const pagePermission: PagePermission = {
    page: checkPermission(`${permissionPrefix}/index`, permissions),
    create: checkPermission(`${permissionPrefix}/create`, permissions),
    update: checkPermission(`${permissionPrefix}/update`, permissions),
    delete: checkPermission(`${permissionPrefix}/delete`, permissions)
  };

  /** 获取表格数据 */
  const getPage = useCallback(async () => {
    const params = { ...searchData, page, pageSize };

    try {
      setLoading(true);
      const { code, data } = await getArticlePage(params);

      if (Number(code) === 200) {
        const { items, total } = data;
        setTotal(total);
        setTableData(items);
      }
    } finally {
      setFetch(false);
      setLoading(false);
    }
  }, [page, pageSize, searchData]);

  useEffect(() => {
    if (isFetch) getPage();
  }, [getPage, isFetch]);

  /**
   * 点击搜索
   * @param values - 表单返回数据
   */
  const onSearch = (values: FormData) => {
    setPage(1);
    setSearchData(values);
    setFetch(true);
  };

  // 首次进入自动加载接口数据
  useEffect(() => {
    if (pagePermission.page && !isRefreshPage) getPage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePermission.page]);

  // 如果是新增或编辑成功重新加载页面
  useEffect(() => {
    if (isRefreshPage) {
     setRefreshPage(false);
      getPage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefreshPage]);

  /** 点击新增 */
  const onCreate = () => {
    navigate('/content/article/option?type=create');
  };

  /**
   * 点击编辑
   * @param id - 唯一值
   */
  const onUpdate = (id: string) => {
    navigate(`/content/article/option?type=update&id=${id}`);
  };

  /**
   * 点击删除
   * @param id - 唯一值
   */
  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      const { code, message } = await deleteArticle(id as string);
      if (Number(code) === 200) {
        messageApi.success(message || t('public.successfullyDeleted'));
        getPage();
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * 处理分页
   * @param page - 当前页数
   * @param pageSize - 每页条数
   */
  const onChangePagination = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
    setFetch(true);
  };

  /**
   * 渲染操作
   * @param _ - 当前值
   * @param record - 当前行参数
   */
  const optionRender: TableOptions<object> = (_, record) => (
    <>
      {
        pagePermission.update === true &&
        <UpdateBtn
          className='mr-5px'
          isLoading={isLoading}
          onClick={() => onUpdate((record as RowData).id)}
        />
      }
      {
        pagePermission.delete === true &&
        <DeleteBtn
          className='mr-5px'
          isLoading={isLoading}
          handleDelete={() => onDelete((record as RowData).id)}
        />
      }
    </>
  );

  return (
    <BaseContent isPermission={pagePermission.page}>
      { contextHolder }
      <BaseCard>
        <BaseSearch
          list={searchList(t)}
          data={searchData}
          isLoading={isLoading}
          handleFinish={onSearch}
        />
      </BaseCard>

      <BaseCard className='mt-10px'>
        <BaseTable
          isLoading={isLoading}
          isCreate={pagePermission.create}
          columns={tableColumns(t, optionRender)}
          dataSource={tableData}
          getPage={getPage}
          onCreate={onCreate}
        />

        <BasePagination
          disabled={isLoading}
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={onChangePagination}
        />
      </BaseCard>
    </BaseContent>
  );
}

export default Page;
