import * as yup from "yup";

// Todo: 入力内容は別ファイルに分けた方が良い
const REQUIRE_MSG = "エンジビアを入力してください";
const ACCOUNT_NAME_REQUIRE = "アカウント名を入力してください";
const TITLE_REQUIRE = "タイトルを入力してください";
const DATE_REQUIRE = "日付を入力してください";
const TITLE_REQUIRE_MAX_COUNT = "タイトルは100文字以内で入力してください";
const DATE_MAX_COUNT = "日付はYYYY/MM/DD形式で入力してください";
const ACCOUNT_NAME_MAX_COUNT = "アカウント名は21文字以内で入力してください";
const VIOLATION_PASSWORD_MAX_COUNT = "100文字以内で入力してください";

const schemas = () => {
  return yup.object().shape({
    engivia: yup
      .string()
      .required(REQUIRE_MSG)
      .max(100, VIOLATION_PASSWORD_MAX_COUNT),
    username: yup
      .string()
      .required(ACCOUNT_NAME_REQUIRE)
      .max(21, ACCOUNT_NAME_MAX_COUNT),
    title: yup
      .string()
      .required(TITLE_REQUIRE)
      .max(100, TITLE_REQUIRE_MAX_COUNT),
    // Todo: 日付のバリデーションで前の日を選択できないようにする
    // Todo: 日付の形式と入力文字でバリデーションを分ける
    broadCastingDate: yup
      .string()
      .required(DATE_REQUIRE)
      .max(10, DATE_MAX_COUNT),
  });
};

export default schemas;
