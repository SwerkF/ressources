import * as yup from "yup";

export const userPostSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
  bio: yup.string().required(),
  avatarType: yup.string().required(),
  avatarData: yup.object().required(),
  socialMedias: yup.array().of(
    yup.object().shape({
      platform: yup.string().required(),
      url: yup.string().required(),
    })
  ),
  interests: yup.array().of(yup.string()),
});
