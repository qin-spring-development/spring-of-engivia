import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Props, TextArea } from "./index";

export default {
  component: TextArea,
  title: "Components/Form/TextArea",
} as Meta;

const Template: Story<Props> = (args) => <TextArea {...args} />;

export const EntryTittle = Template.bind({});

EntryTittle.args = {
  placeholder: "エンジビアを入力する",
  rows: 3,
  maxlength: 100,
  length: 0,
  classNameAlert: "",
};
export const Alert = Template.bind({});
Alert.args = {
  placeholder: "100文字以上の場合",
  rows: 3,
  maxlength: 100,
  className: "text-red-700 border-red-300 focus:ring-red-700",
  length: 100,
  classNameAlert: "text-red-700",
};
