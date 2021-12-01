import * as yup from "yup";

const REQUIRE_MSG = "エンジビアを入力してください";
const VIOLATION_PASSWORD_MAX_COUNT = "100文字以内で入力してください";

export const engiviaSchema = yup.object().shape({
  engivia: yup
    .string()
    .required(REQUIRE_MSG)
    .max(100, VIOLATION_PASSWORD_MAX_COUNT),
});
