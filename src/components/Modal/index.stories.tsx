import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Modal, Props } from "./index";

export default {
  component: Modal,
  title: "Components/Modal",
} as Meta;

const Template: Story<Props> = (args) => <Modal {...args} />;

export const Normal = Template.bind({});

Normal.args = {
  isOpen: true,
};
