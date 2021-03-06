import { Button, Input, InputNumber } from "antd";
import { useClassActions } from "@iso/actions";
import Breadcrumbs from "@iso/components/Breadcrumbs";
import { Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { ControlFilled } from "@ant-design/icons";
import Major from "./Major";

export default function Add() {
  const classActions = useClassActions();
  const [selectedItem, setSelectedItem] = useState();
  let { id } = useParams();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Username is required"),
    quantity: Yup.string().required("Quantity is required"),
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
      const res = await classActions.getClassesDetail(id);
      setValue("name", res?.name);
      setValue("quantity", parseInt(res?.quantity));
      setSelectedItem(res?.major.id);
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
        res = await classActions.updateClasses(id, body);
      } else {
        res = await classActions.postClasses(e);
      }
      toast.success(id ? "Update class success!!!" : "Create class success!!!");
    } catch (error) {
      toast.error("Something when wrong!!!");
    }
  };

  const breadItem = [
    {
      name: "Classes",
      path: "/class",
    },
    {
      name: id ? "Update class" : "Add class",
      path: "",
    },
  ];

  const handleSetSelectedItem = (e) => {
    e && setValue("majorId", e[0].id);
  };

  return (
    <div className="class-page">
      <Breadcrumbs items={breadItem} />
      <div className="shadow-md bg-white rounded-lg p-4">
        <div className="flex gap-7">
          <div className="w-4/12">
            <form name="basic" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-3 grid-cols-1">
                <Form.Item name="name" label="Name class" className="mb-0">
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
                <Form.Item name="name" label="Quantity" className="mb-0">
                  <Controller
                    name="quantity"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <InputNumber
                        className={`form-control ${
                          errors.quantity ? "is-invalid" : ""
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
          <div className="w-8/12">
            <div className="err-input pl-4">{errors.teacherId?.message}</div>
            <Major
              handleSetSelectedItem={handleSetSelectedItem}
              selectedItem={selectedItem ? [selectedItem] : []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
