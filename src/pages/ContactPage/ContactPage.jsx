import React, { useRef } from "react";
import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
import Card from "../../components/Card/Card";
import styles from "./ContactPage.module.scss";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);

    emailjs.sendForm("service_tv8ii19", "template_c4fk6s7", form.current, "ZCe9RKv0dHXXZQpnh").then(
      (result) => {
        toast.success("Сообщение усспешно отправлено");
      },
      (error) => {
        toast.error(error.text);
      }
    );
    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Контакты</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Имя</label>
              <input type="text" name="user_name" placeholder="ФИО" required />
              <label>Почта</label>
              <input type="email" name="user_email" placeholder="Ваш email" required />
              <label>Тема обращения</label>
              <input type="text" name="subject" placeholder="Тема" required />
              <label>Текст обращения</label>
              <textarea name="message" cols="30" rows="10"></textarea>
              <button className="--btn --btn-primary">Отправить сообщение</button>
            </Card>
          </form>

          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Контактная информация</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+7 999 99 99</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>foxriver660@gmail.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Россия</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@foxriver660</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
