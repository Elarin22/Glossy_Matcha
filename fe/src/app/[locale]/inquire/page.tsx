"use client";

import React, { useState } from "react";
import styles from "./page.module.scss";
import { useTranslations } from "next-intl";
import { postInquire } from "@/services/inquireApi";

export async function generateMetadata() {
  return {
    title: "Contact | Glossy Matcha",
    description: "글로시 말차 문의하기 페이지 - 문의를 작성해주세요.",
    keywords: [
      "말차",
      "프리미엄 말차",
      "글로시 말차",
      "녹차",
      "건강음료",
      "문의",
      "Contact",
    ],
    openGraph: {
      title: "문의하기 | Glossy Matcha",
      description: "글로시 말차 문의하기 페이지 - 문의를 작성해주세요.",
      url: "https://www.glossymatcha.com/ko/inquire",
      images: [
        {
          url: "/images/logo/logo-BI.png",
          width: 1200,
          height: 630,
          alt: "Glossy Matcha",
        },
      ],
    },
  };
}

type FormDataType = {
  name: string;
  email: string;
  message: string;
};

type CategoryCode = "general" | "product" | "other";

export default function Inquire() {
  const t = useTranslations("inquire");
  const categories = t.raw("form.category") as string[];
  type Category = (typeof categories)[number];

  const CATEGORY_MAP: Record<Category, CategoryCode> = {
    [categories[0]]: "general",
    [categories[1]]: "product",
    [categories[2]]: "other",
  };

  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  );

  const FORM_FIELDS: {
    label: string;
    name: keyof FormDataType;
    placeholder: string;
    type: string;
  }[] = [
    {
      label: t("form.name.label"),
      name: "name",
      placeholder: t("form.name.placeholder"),
      type: "text",
    },
    {
      label: t("form.email.label"),
      name: "email",
      placeholder: t("form.email.placeholder"),
      type: "email",
    },
    {
      label: t("form.message.label"),
      name: "message",
      placeholder: t("form.message.placeholder"),
      type: "textArea",
    },
  ];

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => !value)) {
      alert(t("alertMessage.invaild"));
      return;
    }

    const requestData = {
      name: formData.name,
      email: formData.email,
      inquiry_type: CATEGORY_MAP[selectedCategory],
      message: formData.message,
    };

    try {
      const response = await postInquire(requestData);

      if (response.ok) {
        alert(t("alertMessage.success"));
        setSelectedCategory(categories[0]);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(t("alertMessage.fail"));
      }
    } catch (error) {
      alert(t("alertMessage.error"));
      console.error(error);
    }
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.description}>
          {t("description").split("\n")[0]}
          <br />
          {t("description").split("\n")[1]}
        </p>
      </header>

      <section className={styles.formSection}>
        <h3 className="sr-only">{t("hideText.subTitle")}</h3>

        <div
          className={styles.categories}
          role="group"
          aria-label={t("hideText.categoryTitle")}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              aria-pressed={category === selectedCategory}
              className={`${styles.categoryBtn} ${
                category === selectedCategory ? styles.active : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {FORM_FIELDS.map((field) => (
            <div key={field.name} className={styles.field}>
              <label htmlFor={field.name} className={styles.label}>
                {field.label}
              </label>
              {field.type !== "textArea" ? (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={styles.input}
                />
              ) : (
                <textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={styles.textarea}
                />
              )}
            </div>
          ))}

          <button type="submit" className={`btn-g ${styles.submitBtn}`}>
            {t("buttonText")}
          </button>
        </form>
      </section>
    </main>
  );
}
