import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Form, Props } from "./index";

export default {
  component: Form,
  title: "Components/Form",
} as Meta;

const Template: Story<Props> = (args) => <Form {...args} />;

export const Default = Template.bind({});

Default.args = {
  type: "text",
  placeholder: "タイトルを入力してください",
};

export const Date = Template.bind({});

Date.args = {
  type: "date",
  placeholder: "2021/10/30",
};
