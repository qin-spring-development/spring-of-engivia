import * as yup from "yup";
import {
  REQUIRE_MSG,
  VIOLATION_PASSWORD_MAX_COUNT,
  ACCOUNT_NAME_MAX_COUNT,
  ACCOUNT_NAME_REQUIRE,
  TITLE_REQUIRE,
  TITLE_REQUIRE_MAX_COUNT,
  DATE_MAX_COUNT,
  DATE_REQUIRE,
} from "src/constant/errorMessage";

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
    broadCastingDate: yup
      .string()
      .required(DATE_REQUIRE)
      .max(10, DATE_MAX_COUNT),
  });
};

export default schemas;
