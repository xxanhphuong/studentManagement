import { Button, DatePicker, Input, InputNumber } from "antd";
import { useMajorActions } from "@iso/actions";
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
  const majorActions = useMajorActions();
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

  function parseISOString(s) {
    return new Date(s.split("T")[0]);
  }

  // get Data
  const getData = async () => {
    try {
      const { name, startDate, finishDate } = await majorActions.getMajorDetail(
        id
      );
      const s = parseISOString(startDate);
      const f = parseISOString(finishDate);
      setValue("name", name);
      setValue("startDate", s);
      setValue("finishDate", f);
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
        await majorActions.updateMajor(id, body);
      } else {
        await majorActions.postMajor(e);
      }
      toast.success(id ? "Update class success!!!" : "Create class success!!!");
    } catch (error) {
      toast.error("Something when wrong!!!");
    }
  };

  const breadItem = [
    {
      name: "Major",
      path: "/major",
    },
    {
      name: id ? "Update major" : "Add major",
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
                {watch("startDate") ? (
                  <>
                    {id ? (
                      <Controller
                        name="startDate"
                        control={control}
                        render={() => {
                          return (
                            <DatePicker
                              defaultValue={moment(watch("startDate"))}
                              onChange={(date, dateString) =>
                                setValue("startDate", dateString)
                              }
                            />
                          );
                        }}
                      />
                    ) : (
                      <Controller
                        name="startDate"
                        control={control}
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => {
                          return <DatePicker onChange={onChange} />;
                        }}
                      />
                    )}
                  </>
                ) : (
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                      return <DatePicker onChange={onChange} />;
                    }}
                  />
                )}

                <div className="err-input">{errors.startDate?.message}</div>
              </Form.Item>
              <Form.Item name="finishDate" label="Finish Date" className="mb-0">
                {watch("finishDate") ? (
                  <>
                    {id ? (
                      <Controller
                        name="finishDate"
                        control={control}
                        render={() => {
                          return (
                            <DatePicker
                              defaultValue={moment(watch("finishDate"))}
                              onChange={(date, dateString) =>
                                setValue("finishDate", dateString)
                              }
                            />
                          );
                        }}
                      />
                    ) : (
                      <Controller
                        name="finishDate"
                        control={control}
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => {
                          return <DatePicker onChange={onChange} />;
                        }}
                      />
                    )}
                  </>
                ) : (
                  <Controller
                    name="finishDate"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                      return <DatePicker onChange={onChange} />;
                    }}
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
