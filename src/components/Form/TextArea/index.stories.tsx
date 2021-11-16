import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Props, TextArea } from "./index";

export default {
  // component: Form,
  title: "Components/Form/TextArea",
} as Meta;

const Template: Story<Props> = (args) => <TextArea {...args} />;

export const EntryTittle = Template.bind({});

EntryTittle.args = {
  placeholder: "エンジビアを入力する",
  rows: 3,
  maxlength: 100,
};
