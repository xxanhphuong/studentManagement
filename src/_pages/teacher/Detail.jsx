import { Button, Input, InputNumber, Spin } from "antd";
import { useTeacherActions } from "@iso/actions";
import Breadcrumbs from "@iso/components/Breadcrumbs";
import { Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { useState } from "react";
import moment from "moment";

export default function Detail() {
  const teacherActions = useTeacherActions();
  const [data, setData] = useState();
  let { id } = useParams();

  useEffect(() => {
    id && getData();
  }, []);

  // get Data
  const getData = async () => {
    try {
      const res = await teacherActions.getTeacherDetail(id);
      setData(res);
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
  };

  const breadItem = [
    {
      name: "Teacher",
      path: "/teacher",
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
              <label>UserName:</label>
              <span>{data?.user?.username}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <label>Name:</label>
              <span>{data?.user?.fullName}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <label>Gender:</label>
              <span>{data?.user?.gender}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <label>Date of birth:</label>
              <span>
                {moment(data?.user?.dateOfBirth).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <label>salary:</label>
              <span>{data?.salary}</span>
            </div>
          </div>
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
}
