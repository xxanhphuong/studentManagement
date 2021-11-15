import { Button, Input, InputNumber, Spin } from "antd";
import { useClassActions } from "@iso/actions";
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
  const classActions = useClassActions();
  const [data, setData] = useState();
  let { id } = useParams();

  useEffect(() => {
    id && getData();
  }, []);

  // get Data
  const getData = async () => {
    try {
      const res = await classActions.getClassesDetail(id);
      setData(res);
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
  };

  const breadItem = [
    {
      name: "Classes",
      path: "/class",
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
          <div className="w-3/12">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <label>Name:</label>
              <span>{data?.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <label>Quantity:</label>
              <span>{data?.quantity}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <label>Major:</label>
              <span>{data?.major?.name}</span>
            </div>
          </div>
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
}
