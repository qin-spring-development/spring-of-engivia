import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Button, Props } from "./index";

export default {
  component: Button,
  title: "Components/Button",
} as Meta;

const Template: Story<Props> = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  type: "button",
  children: "登録",
};
