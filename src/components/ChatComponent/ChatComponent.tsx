import React from "react";
import ChatBot from "react-simple-chatbot";
import { useTranslation } from "react-i18next";

interface ChatData {
  gender: string;
  category: string;
  price: number;
}

const ChatComponent: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      id: "1",
      message: t("greeting"),
      trigger: "2",
    },
    {
      id: "2",
      message: t("askGender"),
      trigger: "3",
    },
    {
      id: "3",
      options: [
        {
          value: "man",
          label: t("genderOptions.man"),
          trigger: "4",
          metadata: { gender: "man" },
        },
        {
          value: "woman",
          label: t("genderOptions.woman"),
          trigger: "4",
          metadata: { gender: "woman" },
        },
        {
          value: "child",
          label: t("genderOptions.child"),
          trigger: "4",
          metadata: { gender: "child" },
        },
      ],
    },
    {
      id: "4",
      message: t("askCategory"),
      trigger: "5",
    },
    {
      id: "5",
      options: [
        {
          value: "shirts",
          label: t("categories.shirts"),
          trigger: "6",
          metadata: { category: "shirts" },
        },
        {
          value: "pants",
          label: t("categories.pants"),
          trigger: "6",
          metadata: { category: "pants" },
        },
        {
          value: "dresses",
          label: t("categories.dresses"),
          trigger: "6",
          metadata: { category: "dresses" },
        },
        {
          value: "jackets and coats",
          label: t("categories.jacketsAndCoats"),
          trigger: "6",
          metadata: { category: "jackets and coats" },
        },
        {
          value: "skirts",
          label: t("categories.skirts"),
          trigger: "6",
          metadata: { category: "skirts" },
        },
        {
          value: "jumpsuits",
          label: t("categories.jumpsuits"),
          trigger: "6",
          metadata: { category: "jumpsuits" },
        },
        {
          value: "underwear and pajamas",
          label: t("categories.underwearAndPajamas"),
          trigger: "6",
          metadata: { category: "underwear and pajamas" },
        },
        {
          value: "Activewear",
          label: t("categories.activewear"),
          trigger: "6",
          metadata: { category: "activewear" },
        },
      ],
    },
    {
      id: "6",
      message: t("askPrice"),
      trigger: "7",
    },
    {
      id: "7",
      user: true,
      trigger: "8",
      validator: (value: string) => {
        const price = parseFloat(value);
        return isNaN(price) ? t("enterValidNumber") : true;
      },
      metadata: { price: undefined },
    },
    {
      id: "8",
      message: t("showProducts"),
      end: true,
    },
  ];

  const handleCollect = (data: ChatData) => {
    console.log("Collected data:", data);
  };

  return <ChatBot steps={steps} floating handleEnd={handleCollect} />;
};

export default ChatComponent;
