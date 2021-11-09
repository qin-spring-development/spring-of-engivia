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
  label: "放送前・エンジビア募集中",
};

export const OnAirBroadcast = Template.bind({});

OnAirBroadcast.args = {
  label: "放送中",
};

export const AfterBroadcast = Template.bind({});

AfterBroadcast.args = {
  label: "放送済",
};
