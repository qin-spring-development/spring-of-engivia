import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { EngiviaCard, Props } from "./index";

export default {
  component: EngiviaCard,
  title: "Components/EngiviaCard",
} as Meta;

const Template: Story<Props> = (args) => <EngiviaCard {...args} />;

export const Default = Template.bind({});

Default.args = {
  engivia: {
    id: "1",
    engiviaNumber: 1,
    body: "ここにエンジビアが入ります。",
    createdAt: "おさむ",
    featureStatus: "BEFORE",
    postUser: { image: "./15007672.jpeg", name: "おさむ", id: "000000000" },
    totalLikes: 20,
    joinUsersCount: 20,
  },
};
