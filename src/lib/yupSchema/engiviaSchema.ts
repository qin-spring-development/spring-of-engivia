import * as yup from "yup";

const REQUIRE_MSG = "必須入力項目です";
const VIOLATION_PASSWORD_MAX_COUNT =
  "エンジビアは100文字以下で入力してください";

export const engiviaSchema = yup.object().shape({
  engivia: yup
    .string()
    .required(REQUIRE_MSG)
    .max(100, VIOLATION_PASSWORD_MAX_COUNT),
});
