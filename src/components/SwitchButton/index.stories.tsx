import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { SwitchButton, Props } from "./index";

export default {
  component: SwitchButton,
  title: "Components/SwitchButton",
} as Meta;

const Template: Story<Props> = (args) => <SwitchButton {...args} />;

export const Button = Template.bind({});

Button.args = {
  broadcastId: "string",
  likes: 0,
};
