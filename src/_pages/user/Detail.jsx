import { Button, Input, InputNumber, Spin } from "antd";
import { useUserActions } from "@iso/actions";
import Breadcrumbs from "@iso/components/Breadcrumbs";
import { Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { useState } from "react";
import * as moment from "moment";

export default function Detail() {
  const userActions = useUserActions();
  const [data, setData] = useState();
  let { id } = useParams();

  useEffect(() => {
    id && getData();
  }, []);

  // get Data
  const getData = async () => {
    try {
      const res = await userActions.userProfile(id);
      setData(res);
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
  };

  const breadItem = [
    {
      name: "User",
      path: "/user",
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
              <label>Full Name:</label>
              <span>{data?.fullName}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <label>Username:</label>
              <span>{data?.username}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <label>Gender:</label>
              <span>{data?.gender}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <label>Role:</label>
              <span>{data?.role}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <label>Date Of Birth:</label>
              <span>
                {data?.dateOfBirth
                  ? moment(data?.dateOfBirth).format("DD/MM/YYYY")
                  : ""}
              </span>
            </div>
          </div>
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
}
