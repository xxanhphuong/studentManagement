import { useEffect, useState } from "react";
import { Table, Button, Input, Tag } from "antd";
import { useMajorActions } from "@iso/actions";
import Breadcrumbs from "@iso/components/Breadcrumbs";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getRole } from "@iso/helpers/";
import { userRole } from "@iso/helpers/contant";
export default function Major(props) {
  let { id } = useParams();
  const majorActions = useMajorActions();
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
    const resp = await majorActions.getMajor(offset, limit, params, filters);
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
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (b) => {
        return moment(b).format("DD/MM/yyyy");
      },
    },
    {
      title: "Finish Date",
      dataIndex: "finishDate",
      key: "finishDate",
      render: (b) => {
        return moment(b).format("DD/MM/yyyy");
      },
    },
  ];

  const onSubmit = (e) => {
    handleTableChange(data.paging, e.search, {});
  };

  const onClearSearch = (e) => {
    reset();
    handleTableChange(data.paging, "", {});
  };
  let rowSelection = {
    selections: true,
    onChange: (selectedRowKeys, selectedRows) => {
      props.handleSetSelectedItem(selectedRows);
    },
    getCheckboxProps: (record) => {
      console.log(record, props.selectedItem, "alksndlaksnd");
      return {
        // Column configuration not to be checked
        name: record.id,
        disabled: props.selectedItem?.findIndex((e) => e == record.id) > -1,
        defaultChecked: true,
      };
    },
  };
  return (
    <div className="class-page">
      <div className=" p-4 pt-2">
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
        </div>
        {!id ? (
          <Table
            columns={columns}
            dataSource={data.dataSource}
            onChange={handleTableChange}
            rowSelection={{
              type: "radio",
              ...rowSelection,
            }}
            rowKey={(record) => record.id}
            pagination={{
              current: data.paging.current,
              total: data.paging.total,
              pageSize: data.paging.pageSize,
            }}
          />
        ) : props.selectedItem ? (
          <Table
            columns={columns}
            dataSource={data.dataSource}
            onChange={handleTableChange}
            rowSelection={{
              type: "radio",
              ...rowSelection,
            }}
            rowKey={(record) => record.id}
            pagination={{
              current: data.paging.current,
              total: data.paging.total,
              pageSize: data.paging.pageSize,
            }}
          />
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
}
