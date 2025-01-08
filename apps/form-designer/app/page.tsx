import { Metadata } from "next";
import Link from "next/link";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Form Designer",
  description: "一套成熟的表单解决方案。",
  keywords: ["Form", "Form Designer", "成熟的表单解决方案"],
};

const linkConfig = [
  {
    title: "基础组件",
    href: "/docs",
    bgColor: "#afb42b",
  },
  {
    title: "表单设计工具",
    href: "/builder",
    bgColor: "#8bc34a",
  },
  {
    title: "问卷调查",
    href: "/questionnaire",
    bgColor: "#4caf50",
  },
];

const Home = () => {
  return (
    <div className={styles.pageBox}>
      <h1 className={styles.title}>Form Designer，一套成熟的表单解决方案。</h1>
      <ul className={styles.listBox}>
        {linkConfig.map((item: any) => (
          <li key={item.title}>
            <Link
              className={styles.itemBox}
              style={{
                backgroundColor: item.bgColor ? item.bgColor : "#e3f2fd",
              }}
              href={item.href}
            >
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
