"use client";
import "./People.css";
import { Button, Card, Form, InputNumber, Spin } from "antd";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import axios from "axios";
import { useMemo, useState } from "react";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        padding: 20,
        usePointStyle: true,
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.label || "";
          const value = context.raw || "";
          return `${label}: ${value}`;
        },
      },
    },
  },
  cutout: "80%",
};

const PeopleTab = ({
  isEditable = false,
  setActiveMenu,
  peopleData,
  setPeopleData,
}) => {
  const { male, female, boy, girl } = peopleData;
  const [loader, setLoader] = useState(false);
  const onFinish = async (values) => {
    setLoader(true);
    await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/people/modify`,
      values,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails"))?.token
          }`,
        },
      }
    );
    setActiveMenu("2");
    setPeopleData([]);
    setLoader(false);
  };

  const data = useMemo(
    () => ({
      labels: ["Male", "Female", "Girl", "Boy"],
      datasets: [
        {
          data: [male, female, girl, boy],
          backgroundColor: ["#4472c4", "#ed7d31", "#a5a5a5", "#ffc000"],
          borderColor: "#fff",
          borderWidth: 0.3,
        },
      ],
    }),
    [peopleData]
  );

  return (
    <Form name="people-settings" initialValues={peopleData} onFinish={onFinish}>
      <div className="people-container">
        <div className="icons-container">
          <div className="icon-item">
            <img
              src="https://cdn0.iconfinder.com/data/icons/business-blue-series-set-1-1/128/a-21-64.png"
              alt="men"
            />
            {isEditable ? (
              <Form.Item name="male">
                <InputNumber placeholder="male" />
              </Form.Item>
            ) : (
              <div className="icon-number">{male}</div>
            )}
          </div>
          <div className="icon-item">
            <img
              src="https://cdn4.iconfinder.com/data/icons/cosmetology-set/52/cosmetology-02-64.png"
              alt="female"
            />
            {isEditable ? (
              <Form.Item name="female">
                <InputNumber placeholder="female" />
              </Form.Item>
            ) : (
              <div className="icon-number">{female}</div>
            )}
          </div>
          <div className="icon-item">
            <img
              src="https://cdn3.iconfinder.com/data/icons/family-member-flat-happy-family-day/512/Sister-64.png"
              alt="girl"
            />
            {isEditable ? (
              <Form.Item name="girl">
                <InputNumber placeholder="girl" />
              </Form.Item>
            ) : (
              <div className="icon-number">{girl}</div>
            )}
          </div>
          <div className="icon-item">
            <img
              src="https://cdn0.iconfinder.com/data/icons/avatar-2/500/man-2-64.png"
              alt="boy"
            />
            {isEditable ? (
              <Form.Item name="boy">
                <InputNumber placeholder="boy" />
              </Form.Item>
            ) : (
              <div className="icon-number">{boy}</div>
            )}
          </div>
        </div>
        {isEditable ? (
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {loader ? <Spin className="loader" /> : "Submit"}
            </Button>
          </Form.Item>
        ) : (
          <div className="chart-container">
            <div>People</div>
            <Doughnut data={data} options={options} />
          </div>
        )}
      </div>
    </Form>
  );
};

export default PeopleTab;
