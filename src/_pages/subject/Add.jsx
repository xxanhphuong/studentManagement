import { Button, Input, InputNumber } from "antd";
import { useSubjectActions } from "@iso/actions";
import Breadcrumbs from "@iso/components/Breadcrumbs";
import { Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ControlFilled } from "@ant-design/icons";
import Teacher from "./Teacher";

export default function Add() {
  const subjectActions = useSubjectActions();
  const [selectedItem, setSelectedItem] = useState();
  let { id } = useParams();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Username is required"),
    teacherId: Yup.string().required("teacherId is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { handleSubmit, formState, control, setValue, watch } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    id && getData();
  }, []);

  // get Data
  const getData = async () => {
    try {
      const { name, credit, finalScoreRatio, midScoreRatio, teacherId } =
        await subjectActions.getSubjectDetail(id);
      setValue("name", name);
      setValue("credit", parseInt(credit));
      setValue("finalScoreRatio", parseInt(finalScoreRatio));
      setValue("midScoreRatio", parseInt(midScoreRatio));
      setValue("teacherId", parseInt(teacherId));
      setSelectedItem(parseInt(teacherId));
    } catch (error) {
      toast.error("Something when wrong!!!");
    }
  };

  // submit form
  const onSubmit = async (e) => {
    e.majorId = 2;
    let res;
    try {
      if (id) {
        const body = {
          id: id,
          ...e,
        };
        res = await subjectActions.updateSubject(id, body);
      } else {
        res = await subjectActions.postSubject(e);
      }
      toast.success(
        id ? "Update subject success!!!" : "Create subject success!!!"
      );
    } catch (error) {
      toast.error("Something when wrong!!!");
    }
  };

  const breadItem = [
    {
      name: "Subject",
      path: "/subject",
    },
    {
      name: id ? "Update subject" : "Add subject",
      path: "",
    },
  ];

  const handleSetSelectedItem = (e) => {
    e && setValue("teacherId", e[0].teacherId);
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
                <Form.Item name="name" label="Name" className="mb-0">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Input
                        className={`form-control ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  <div className="err-input">{errors.name?.message}</div>
                </Form.Item>
                <Form.Item name="name" label="Credit" className="mb-0">
                  <Controller
                    name="credit"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <InputNumber
                        className={`form-control ${
                          errors.credit ? "is-invalid" : ""
                        }`}
                        min={1}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <div className="err-input">{errors.credit?.message}</div>
                </Form.Item>
                <Form.Item name="name" label="Mid Score Ratio" className="mb-0">
                  <Controller
                    name="midScoreRatio"
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
                <Form.Item
                  name="name"
                  label="Final Score Ratio"
                  className="mb-0"
                >
                  <Controller
                    name="finalScoreRatio"
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
            <div className="err-input pl-4">{errors.teacherId?.message}</div>
            <Teacher
              handleSetSelectedItem={handleSetSelectedItem}
              selectedItem={selectedItem ? [selectedItem] : []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
