"use client";

import React, { useState } from "react";
import styles from "./page.module.scss";

type FormDataType = {
  name: string;
  email: string;
  message: string;
};

type Category = "일반 문의" | "제품 문의" | "기타";

const CATEGORIES: Category[] = ["일반 문의", "제품 문의", "기타"];

const CATEGORY_MAP = {
  "일반 문의": "general",
  "제품 문의": "product",
  기타: "other",
} as const;

const FORM_FIELDS = [
  {
    label: "이름",
    name: "name" as keyof FormDataType,
    placeholder: "이름을 입력해주세요.",
    type: "text",
  },
  {
    label: "이메일",
    name: "email" as keyof FormDataType,
    placeholder: "이메일을 입력해주세요.",
    type: "email",
  },
  {
    label: "문의 내용",
    name: "message" as keyof FormDataType,
    placeholder: "문의 내용을 입력해주세요.",
    type: "textArea",
  },
] as const;

export default function Inquire() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    CATEGORIES[0]
  );
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => !value)) {
      alert("모든 입력란을 작성해주세요.");
      return;
    }

    fetchInquire();
  };

  const fetchInquire = async () => {
    const requestData = {
      name: formData.name,
      email: formData.email,
      inquiry_type: CATEGORY_MAP[selectedCategory],
      message: formData.message,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/inquiries/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      console.log(requestData);

      if (response.ok) {
        alert("문의를 접수했습니다. 확인 즉시 이메일로 답변드릴게요!");
        setSelectedCategory(CATEGORIES[0]);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        alert("문의 접수에 실패했습니다. 다시 시도해주세요.");
      }

      console.log(
        "전송 url: ",
        `${process.env.NEXT_PUBLIC_API_URL}/api/inquiries/`
      );
      console.log("response: ", response);
    } catch (error) {
      alert("네트워크 오류가 발생했습니다.");
      console.error("error:", error);
    }
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>문의하기</h2>
        <p className={styles.description}>
          궁금한 사항이 있으신가요?
          <br />
          담당자가 빠른 시간내에 이메일로 답변을 드릴게요.
        </p>
      </header>

      <section className={styles.formSection}>
        <h3 className="sr-only">문의 내용 작성</h3>

        <div
          className={styles.categories}
          role="group"
          aria-label="문의 카테고리 선택"
        >
          {CATEGORIES.map((category) => (
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
            문의하기
          </button>
        </form>
      </section>
    </main>
  );
}
