import { Button, Input, InputNumber, Spin } from "antd";
import { useMajorActions } from "@iso/actions";
import Breadcrumbs from "@iso/components/Breadcrumbs";
import { Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { useState } from "react";

export default function Detail() {
  const majorActions = useMajorActions();
  const [data, setData] = useState();
  let { id } = useParams();

  useEffect(() => {
    id && getData();
  }, []);

  // get Data
  const getData = async () => {
    try {
      const res = await majorActions.getMajorDetail(id);
      setData(res);
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
  };

  const breadItem = [
    {
      name: "Major",
      path: "/major",
    },
    {
      name: "Detail",
      path: "",
    },
  ];

  return (
    <div className="class-page">
      <Breadcrumbs items={breadItem} />
      <div className="shadow-md bg-white rounded-lg p-4">
        {data ? (
          <div className="w-5/12">
            <div className="flex mb-3">
              <label className="w-3/12">Name:</label>
              <span>{data?.name}</span>
            </div>
            <div className="flex mb-3">
              <label className="w-3/12">Start Date:</label>
              <span>{data?.startDate}</span>
            </div>
            <div className="flex mb-3">
              <label className="w-3/12">Finish Date:</label>
              <span>{data?.finishDate}</span>
            </div>
          </div>
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
}
