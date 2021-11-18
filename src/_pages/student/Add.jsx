import { Button, DatePicker, Input, InputNumber } from "antd";
import { useStudentActions } from "@iso/actions";
import Breadcrumbs from "@iso/components/Breadcrumbs";
import { Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import moment from "moment";

export default function Add() {
  const studentActions = useStudentActions();
  let { id } = useParams();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Username is required"),
    startDate: Yup.string().required("startDate is required"),
    finishDate: Yup.string().required("finishDate is required"),
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
      const { name, startDate, finishDate } =
        await studentActions.getStudentDetail(id);
      setValue("name", name);
      setValue("startDate", moment(startDate).toDate());
      setValue("finishDate", moment(finishDate).toDate());
      // setValue("finishDate", new Date(finishDate));
    } catch (error) {
      toast.error("Something when wrong!!!");
    }
  };

  // submit form
  const onSubmit = async (e) => {
    e.startDate = new Date(e.startDate).toISOString();
    e.finishDate = new Date(e.finishDate).toISOString();
    try {
      if (id) {
        const body = {
          id: id,
          ...e,
        };
        await studentActions.updateMajor(id, body);
      }
      toast.success("Update class success!!!");
    } catch (error) {
      toast.error("Something when wrong!!!");
    }
  };

  const breadItem = [
    {
      name: "Student",
      path: "/student",
    },
    {
      name: "Update major",
      path: "",
    },
  ];

  return (
    <div className="class-page">
      <Breadcrumbs items={breadItem} />
      <div className="shadow-md bg-white rounded-lg p-4">
        <div className="flex justify-between">
          <form
            name="basic"
            onSubmit={handleSubmit(onSubmit)}
            className="w-4/12"
          >
            <div className="grid gap-3 grid-cols-1">
              <Form.Item name="name" label="Name major" className="mb-0">
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
              <Form.Item name="startDate" label="Start Date" className="mb-0">
                {watch("startDate") && (
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                      return (
                        <DatePicker
                          onChange={onChange}
                          defaultValue={moment(value)}
                        />
                      );
                    }}
                  />
                )}

                <div className="err-input">{errors.startDate?.message}</div>
              </Form.Item>
              <Form.Item name="finishDate" label="Finish Date" className="mb-0">
                {watch("finishDate") && (
                  <Controller
                    name="finishDate"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <DatePicker
                        onChange={onChange}
                        defaultValue={moment(value)}
                      />
                    )}
                  />
                )}
                <div className="err-input">{errors.finishDate?.message}</div>
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
  );
}
