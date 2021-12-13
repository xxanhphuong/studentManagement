import { Button, Input, InputNumber, Spin } from "antd";
import { useSubjectActions } from "@iso/actions";
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
  const subjectActions = useSubjectActions();
  const [data, setData] = useState();
  let { id } = useParams();

  useEffect(() => {
    id && getData();
  }, []);

  // get Data
  const getData = async () => {
    try {
      const res = await subjectActions.getSubjectDetail(id);
      setData(res);
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
  };

  const breadItem = [
    {
      name: "Subject",
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
              <label>Mid Score Ratio:</label>
              <span>{data?.midScoreRatio}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <label>finalScoreRatio:</label>
              <span>{data?.finalScoreRatio}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <label>Credit:</label>
              <span>{data?.credit}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <label>teacher Id:</label>
              <span>{data?.teacherId}</span>
            </div>
          </div>
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
}
