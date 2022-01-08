import { Button, Input, InputNumber } from "antd";
import { useScoreActions } from "@iso/actions";
import Breadcrumbs from "@iso/components/Breadcrumbs";
import { Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ControlFilled } from "@ant-design/icons";
import Student from "./Student";
import Subject from "./Subject";

export default function Update() {
  const scoreActions = useScoreActions();
  let { studentID, subjectID } = useParams();
  const [data, setData] = useState();

  const formOptions = {};
  const { handleSubmit, formState, control, setValue, watch } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;

  // submit form
  const onSubmit = async (e) => {
    try {
      const res = await scoreActions.updateScore(e, studentID, subjectID);
      console.log(res);
      toast.success("success!!!");
    } catch (error) {
      toast.error("Something when wrong!!!");
    }
  };

  useEffect(() => {
    if (studentID && subjectID) {
      getData();
    }
  }, []);

  // get Data
  const getData = async () => {
    try {
      const res = await scoreActions.getScoreDetail(studentID, subjectID);
      setValue("midScore", parseInt(res?.midScore));
      setValue("finalScore", parseInt(res?.finalScore));
      setData(res);
    } catch (error) {
      toast.error("Something when wrong!!!");
    }
  };

  const breadItem = [
    {
      name: "Score",
      path: "/score",
    },
    {
      name: "Update score",
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
              <label className="w-3/12">StudentID:</label>
              <span>{data?.student?.studentId}</span>
            </div>
            <div className="flex mb-3">
              <label className="w-3/12">Subject:</label>
              <span>{data?.subject?.name}</span>
            </div>
          </div>
        ) : (
          ""
        )}
        <hr />
        <div className="flex gap-7 mt-4">
          <div className="w-4/12">
            <form
              name="basic"
              onSubmit={handleSubmit(onSubmit)}
              className="w-full"
            >
              <div className="grid gap-3 grid-cols-1">
                <Form.Item name="midScore" label="Mid Score" className="mb-0">
                  <Controller
                    name="midScore"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <InputNumber
                        className={`form-control ${
                          errors.midScoreRatio ? "is-invalid" : ""
                        }`}
                        min={0}
                        max={10}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <div className="err-input">
                    {errors.midScoreRatio?.message}
                  </div>
                </Form.Item>
                <Form.Item name="name" label="Final Score" className="mb-0">
                  <Controller
                    name="finalScore"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <InputNumber
                        className={`form-control ${
                          errors.finalScoreRatio ? "is-invalid" : ""
                        }`}
                        min={0}
                        max={10}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <div className="err-input">
                    {errors.finalScoreRatio?.message}
                  </div>
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-6/12"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
