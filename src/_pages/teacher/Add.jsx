import { Button, Input, InputNumber } from "antd";
import { useTeacherActions } from "@iso/actions";
import Breadcrumbs from "@iso/components/Breadcrumbs";
import { Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { ControlFilled } from "@ant-design/icons";

export default function Add() {
  const teacherActions = useTeacherActions();
  let { id } = useParams();
  const validationSchema = Yup.object().shape({
    salary: Yup.string().required("Quantity is required"),
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
      const { salary } = await teacherActions.getTeacherDetail(id);
      setValue("salary", parseInt(salary));
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
        res = await teacherActions.updateTeacher(id, body);
      } else {
      }
      toast.success(id ? "Update class success!!!" : "Create class success!!!");
    } catch (error) {
      toast.error("Something when wrong!!!");
    }
  };

  const breadItem = [
    {
      name: "Teacher",
      path: "/teacher",
    },
    {
      name: id ? "Update teacher" : "Add teacher",
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
              <Form.Item name="name" label="Salary" className="mb-0">
                <Controller
                  name="salary"
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <InputNumber
                      className={`form-control ${
                        errors.salary ? "is-invalid" : ""
                      }`}
                      min={1}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <div className="err-input">{errors.quantity?.message}</div>
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
