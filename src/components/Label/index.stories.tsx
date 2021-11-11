import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Label, Props } from "./index";

export default {
  component: Label,
  title: "Components/Label",
} as Meta;

const Template: Story<Props> = (args) => <Label {...args} />;

export const BeforeBroadcast = Template.bind({});

BeforeBroadcast.args = {
  status: "BEFORE",
};

export const OnAirBroadcast = Template.bind({});

OnAirBroadcast.args = {
  status: "IN_PROGRESS",
};

export const AfterBroadcast = Template.bind({});

AfterBroadcast.args = {
  status: "DONE",
};
