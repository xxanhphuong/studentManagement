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

export default function Add() {
  const scoreActions = useScoreActions();
  const [selectedItem, setSelectedItem] = useState();
  const [selectedSubject, setSelectedSubject] = useState();
  let { id } = useParams();
  const validationSchema = Yup.object().shape({
    midScore: Yup.string().required("Username is required"),
    studentId: Yup.string().required("Student id is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { handleSubmit, formState, control, setValue, watch } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;

  // submit form
  const onSubmit = async (e) => {
    try {
      const res = await scoreActions.postScore(e);
      console.log(res);
      toast.success("success!!!");
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
      name: id ? "Update score" : "Add score",
      path: "",
    },
  ];

  const handleSetSelectedItem = (e) => {
    e && setValue("studentId", e[0].studentId);
  };

  const handleSetSelectedSubject = (e) => {
    e && setValue("subjectId", e[0].id);
  };

  return (
    <div className="class-page">
      <Breadcrumbs items={breadItem} />
      <div className="shadow-md bg-white rounded-lg p-4">
        <div className="flex gap-7">
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
          <div className="w-8/12">
            <div className="err-input pl-4">{errors.studentId?.message}</div>
            <Student
              handleSetSelectedItem={handleSetSelectedItem}
              selectedItem={selectedItem ? [selectedItem] : []}
            />
            {/* <div className="err-input pl-4">{errors.teacherId?.message}</div> */}
            <Subject
              handleSetSelectedSubject={handleSetSelectedSubject}
              selectedItem={selectedSubject ? [selectedSubject] : []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
