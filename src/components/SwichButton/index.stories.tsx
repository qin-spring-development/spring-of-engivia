import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { SwichButton } from "./index";

export default {
  component: SwichButton,
  title: "Components/SwichButton",
} as Meta;

const Template: Story = () => <SwichButton />;

export const Button = Template.bind({});
