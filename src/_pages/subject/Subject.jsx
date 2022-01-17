import { useEffect, useState } from "react";
import { Table, Button, Input } from "antd";
import { useSubjectActions } from "@iso/actions";
import Breadcrumbs from "@iso/components/Breadcrumbs";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { getRole } from "@iso/helpers/";
import { userRole } from "@iso/helpers/contant";

export default function Subject() {
  const subjectActions = useSubjectActions();
  const { handleSubmit, control, reset, watch } = useForm();
  const [data, setData] = useState({
    dataSource: [],
    paging: {
      current: 1,
      total: 0,
      pageSize: 10,
    },
  });

  useEffect(() => {
    getData(1, data.paging.pageSize);
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    getData(
      pagination.current,
      pagination.pageSize,
      {
        order: sorter.hasOwnProperty("column") ? sorter : false,
      },
      filters
    );
  };
  const getData = async (offset, limit, params = false, filters) => {
    const resp = await subjectActions.getSubject(
      offset,
      limit,
      params,
      filters
    );
    if (resp) {
      // get result
      setData({
        ...resp,
        paging: {
          current: resp.paging.CurrentPage,
          total: resp.paging.TotalCount,
          pageSize: resp.paging.PageSize,
        },
        dataSource: resp.data,
      });
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mid Score Ratio",
      dataIndex: "midScoreRatio",
      key: "midScoreRatio",
      render: (r) => {
        return `${r}%`;
      },
    },
    {
      title: "finalScoreRatio",
      dataIndex: "finalScoreRatio",
      key: "finalScoreRatio",
      render: (r) => {
        return `${r}%`;
      },
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
    },
    {
      align: "center",
      fixed: "right",
      render: (record) => (
        <div className="flex gap-3">
          <Button type="primary">
            <Link to={`/subject/detail/${record.id}`}>View</Link>
          </Button>
          {getRole() == userRole.ADMIN ? (
            <>
              <Button type="primary">
                <Link to={`/subject/update/${record.id}`}>Update</Link>
              </Button>
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDelete(record.id)}
              ></Button>
            </>
          ) : (
            ""
          )}
        </div>
      ),
    },
  ];

  const breadItem = [
    {
      name: "Subject",
      path: "/subject",
    },
  ];

  const handleDelete = async (id) => {
    try {
      await subjectActions.deleteSubject(id);
      toast.success("Delete success");
      handleTableChange(data.paging, watch("search"), {});
    } catch (error) {}
  };

  const onSubmit = (e) => {
    handleTableChange(data.paging, e.search, {});
  };

  const onClearSearch = (e) => {
    reset();
    handleTableChange(data.paging, "", {});
  };

  return (
    <div className="class-page">
      <Breadcrumbs items={breadItem} />
      <div className="shadow-md bg-white rounded-lg p-4">
        <div className="flex justify-between">
          <form name="basic" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-3">
              <Form.Item name="fullName">
                <Controller
                  name="search"
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Input
                      className="form-control"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button type="link" onClick={onClearSearch} className="underline">
                Clear
              </Button>
            </div>
          </form>
          {getRole() == userRole.ADMIN && (
            <Button type="primary">
              <Link to="/subject/add">Add</Link>
            </Button>
          )}
        </div>
        <Table
          columns={columns}
          rowKey="key"
          dataSource={data.dataSource}
          onChange={handleTableChange}
          pagination={{
            current: data.paging.current,
            total: data.paging.total,
            pageSize: data.paging.pageSize,
          }}
        />
      </div>
    </div>
  );
}
