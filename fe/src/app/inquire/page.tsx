"use client";

import React, { useState } from "react";
import styles from "./page.module.scss";

type FormDataType = {
  name: string;
  email: string;
  inquireText: string;
};

const categories: string[] = ["일반 문의", "제품 문의", "기타 문의"];

const fields: {
  label: string;
  name: keyof FormDataType;
  placeholder: string;
  type: string;
}[] = [
  {
    label: "이름",
    name: "name",
    placeholder: "이름을 입력해주세요.",
    type: "text",
  },
  {
    label: "이메일",
    name: "email",
    placeholder: "이메일을 입력해주세요.",
    type: "email",
  },
  {
    label: "문의 내용",
    name: "inquireText",
    placeholder: "문의 내용을 입력해주세요.",
    type: "textArea",
  },
];

export default function Inquire() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    inquireText: "",
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

    console.log("제출! formData: ", formData);

    alert("문의를 접수했습니다. 확인 즉시 이메일로 답변드릴게요!");

    // API 연결
    // 홈화면으로 이동할지 아니면 문의하기 페이지에 그대로 머무를지 고민중. 홈화면으로 이동시에는 아래 상태 초기화 제거
    setFormData({
      name: "",
      email: "",
      inquireText: "",
    });
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>문의하기</h1>
        <p className={styles.description}>
          궁금한 사항이 있으신가요?
          <br />
          담당자가 빠른 시간내에 이메일로 답변을 드릴게요.
        </p>
      </header>

      <section className={styles.formSection}>
        <h2 className="sr-only">문의 내용 작성</h2>

        <div
          className={styles.categories}
          role="group"
          aria-label="문의 카테고리 선택"
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
          {fields.map((field) => (
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
