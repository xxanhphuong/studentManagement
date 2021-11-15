import { useEffect, lazy } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { init_object } from "@iso/helpers/";
import { usersProfileAtom } from "@iso/state/users";
import { useUserActions } from "@iso/actions";
import { Form, Input, Button, Radio, DatePicker, Spin } from "antd";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";

import toast from "react-hot-toast";
import Breadcrumbs from "@iso/components/Breadcrumbs";

export default function UserProfile({ history }) {
  const dateFormat = "YYYY/MM/DD";
  const userProfileData = useRecoilValue(usersProfileAtom);
  const userActions = useUserActions();

  useEffect(() => {
    const user = init_object("user");
    getData(user);
  }, []);

  const getData = async (user) => {
    const res = await userActions.userProfile(user?.id);
    if (res) {
      setValue("username", res.username);
      setValue("fullName", res.fullName);
      setValue("address", res.address);
      setValue("role", res.role);
      setValue("gender", res.gender);
      setValue("dateOfBirth", res.dateOfBirth);
    }
  };

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { handleSubmit, formState, control, setValue, watch } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;

  async function onSubmit(e) {
    console.log(e);
    try {
      const user = init_object("user");
      e.id = user?.id;
      await userActions.updateProfile(user?.id, e);
      toast.success("Update success!!!");
    } catch (error) {
      toast.error("something went wrong!!!");
    }
    return;
  }

  const breadItem = [
    {
      name: "User Profile",
      icon: lazy(() => import("@ant-design/icons/UserOutlined")),
      path: "/user-profile",
    },
  ];

  return (
    <div className="user-profile-page">
      <Breadcrumbs items={breadItem} />
      <div className="content-right flex flex-col">
        <div className="w-12/12 shadow-md bg-white rounded-lg p-4">
          {userProfileData ? (
            <>
              <h2 className="text-3xl mb-1 text-primary">User profile</h2>
              <div className="card-body">
                {errors.apiError && (
                  <div className="err-input mb-0">
                    *{errors.apiError?.message}
                  </div>
                )}
                <form name="basic" onSubmit={handleSubmit(onSubmit)}>
                  <div class="grid grid-cols-2 gap-4">
                    <Form.Item label="Username" name="userName">
                      <Controller
                        label="User name"
                        name="username"
                        control={control}
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <Input
                            className={`form-control ${
                              errors.username ? "is-invalid" : ""
                            }`}
                            onChange={onChange}
                            value={value}
                          />
                        )}
                      />
                      <div className="err-input">
                        {errors.username?.message}
                      </div>
                    </Form.Item>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item label="Full name" name="fullName">
                      <Controller
                        label="Full name"
                        name="fullName"
                        control={control}
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <Input
                            className={`form-control ${
                              errors.fullname ? "is-invalid" : ""
                            }`}
                            onChange={onChange}
                            value={value}
                          />
                        )}
                      />
                      <div className="err-input">
                        {errors.fullname?.message}
                      </div>
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
                    </Form.Item>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item label="Address" name="address">
                      <Controller
                        label="address"
                        name="address"
                        control={control}
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
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
                      <Controller
                        control={control}
                        name="dateOfBirth"
                        render={() => {
                          return (
                            <DatePicker
                              defaultValue={moment(
                                watch("dateOfBirth"),
                                dateFormat
                              )}
                              onChange={(date, dateString) =>
                                setValue("dateOfBirth", dateString)
                              }
                              format={dateFormat}
                            />
                          );
                        }}
                      />
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
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isSubmitting}
                    className="w-2/12"
                  >
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Update
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <Spin />
          )}
        </div>
      </div>
    </div>
  );
}
