export const REQUIRE_MSG = "必須入力項目です";
export const VIOLATION_CORRECT_PATTERN = "正しい形式で入力してください";
export const VIOLATION_NUMBER = "半角数字で入力してください";
export const VIOLATION_OVER_COUNT = (count: number) =>
  `${count}文字以下で入力してください`;
export const VIOLATION_SHORT_COUNT = (count: number) =>
  `${count}文字以上で入力してください`;
export const VIOLATION_COUNT = (count: number) =>
  `${count}文字で入力してください`;
