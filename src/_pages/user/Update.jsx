import { Button, Input, InputNumber, Radio, DatePicker } from "antd";
import { useUserActions } from "@iso/actions";
import Breadcrumbs from "@iso/components/Breadcrumbs";
import { Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import moment from "moment";

export default function Update() {
  const dateFormat = "YYYY/MM/DD";
  const userActions = useUserActions();
  let { id } = useParams();
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    fullName: Yup.string().required("Quantity is required"),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string().required("Address is required"),
    dateOfBirth: Yup.string().required("Date Of Birth is required"),
    role: Yup.string().required("Role is required"),
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
      const { username, fullName, address, role, gender, dateOfBirth } =
        await userActions.userProfile(id);
      const p = parseISOString(dateOfBirth);
      setValue("username", username);
      setValue("fullName", fullName);
      setValue("address", address);
      setValue("role", role);
      setValue("gender", gender);
      setValue("dateOfBirth", p);
    } catch (error) {
      toast.error("Something when wrong!!!");
    }
  };

  // submit form
  const onSubmit = async (e) => {
    e.dateOfBirth = moment(e.dateOfBirth).format("yyyy/MM/DD");
    try {
      if (id) {
        const body = {
          id: id,
          ...e,
        };
        await userActions.updateProfile(id, body);
      }
      toast.success("Update user success!!!");
    } catch (error) {
      toast.error("Something when wrong!!!");
    }
  };

  const breadItem = [
    {
      name: "User",
      path: "/user",
    },
    {
      name: "Update",
      path: "",
    },
  ];

  return (
    <div className="class-page">
      <Breadcrumbs items={breadItem} />
      <div className="shadow-md bg-white rounded-lg p-4">
        <div className="flex justify-between">
          <form name="basic" onSubmit={handleSubmit(onSubmit)}>
            <div class="grid grid-cols-2 gap-12">
              <Form.Item label="Username" name="userName">
                <Controller
                  label="User name"
                  name="username"
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Input
                      className={`form-control ${
                        errors.username ? "is-invalid" : ""
                      }`}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <div className="err-input">{errors.username?.message}</div>
              </Form.Item>
            </div>
            <div className="grid grid-cols-2 gap-12">
              <Form.Item label="Full name" name="fullName">
                <Controller
                  label="Full name"
                  name="fullName"
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Input
                      className={`form-control ${
                        errors.fullname ? "is-invalid" : ""
                      }`}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <div className="err-input">{errors.fullName?.message}</div>
              </Form.Item>
              <Form.Item label="Gender">
                <Controller
                  control={control}
                  name="gender"
                  render={() => (
                    <Radio.Group
                      value={watch("gender")}
                      onChange={(e) => {
                        setValue("gender", e.target.value);

                        console.log(e.target.value);
                      }}
                    >
                      <Radio value={"Nam"}>Male</Radio>
                      <Radio value={"Nữ"}>Female</Radio>
                    </Radio.Group>
                  )}
                />
                <div className="err-input">{errors.gender?.message}</div>
              </Form.Item>
            </div>
            <div className="grid grid-cols-2 gap-12">
              <Form.Item label="Address" name="address">
                <Controller
                  label="address"
                  name="address"
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Input
                      className={`form-control`}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <div className="err-input">{errors.address?.message}</div>
              </Form.Item>
              <Form.Item label="Date of birth">
                {watch("dateOfBirth") && (
                  <Controller
                    control={control}
                    name="dateOfBirth"
                    render={() => {
                      return (
                        <DatePicker
                          defaultValue={moment(watch("dateOfBirth"))}
                          onChange={(date, dateString) =>
                            setValue("dateOfBirth", dateString)
                          }
                          format={dateFormat}
                        />
                      );
                    }}
                  />
                )}

                <div className="err-input">{errors.dateOfBirth?.message}</div>
              </Form.Item>
            </div>
            <Form.Item label="Role">
              <Controller
                control={control}
                name="role"
                render={() => (
                  <Radio.Group
                    value={watch("role")}
                    onChange={(e) => {
                      setValue("role", e.target.value);

                      console.log(e.target.value);
                    }}
                  >
                    <Radio value={"admin"}>Admin</Radio>
                    <Radio value={"teacher"}>Teacher</Radio>
                    <Radio value={"student"}>Student</Radio>
                  </Radio.Group>
                )}
              />
              <div className="err-input">{errors.role?.message}</div>
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Controller
                label="Password"
                name="password"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Input
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              <div className="err-input">{errors.password?.message}</div>
            </Form.Item>

            <Button type="primary" htmlType="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
