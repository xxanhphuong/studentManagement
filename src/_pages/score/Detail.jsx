import { Button, Input, InputNumber, Spin } from "antd";
import { useScoreActions } from "@iso/actions";
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
  const scoreActions = useScoreActions();
  const [data, setData] = useState();
  let { studentID, subjectID } = useParams();

  useEffect(() => {
    if (studentID && subjectID) {
      getData();
    }
  }, []);

  // get Data
  const getData = async () => {
    try {
      const res = await scoreActions.getScoreDetail(studentID, subjectID);
      setData(res);
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
  };

  const breadItem = [
    {
      name: "Score",
      path: "/score",
    },
    {
      name: "Score",
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
              <label className="w-3/12">Subject:</label>
              <span>{data?.subject?.name}</span>
            </div>
            <div className="flex mb-3">
              <label className="w-3/12">Mid score:</label>
              <span>{data?.midScore}</span>
            </div>
            <div className="flex mb-3">
              <label className="w-3/12">Final score:</label>
              <span>{data?.finalScore}</span>
            </div>
          </div>
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
}
