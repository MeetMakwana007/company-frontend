import "./People.css";
import { Button, Card, Form, InputNumber } from "antd";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const data = {
  labels: ["Male", "Female", "Girl", "Boy"],
  datasets: [
    {
      data: [255, 300, 100, 110],
      backgroundColor: ["#4472c4", "#ed7d31", "#a5a5a5", "#ffc000"],
      borderColor: "#fff",
      borderWidth: 0.3,
    },
  ],
};

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

const onFinish = (values) => {
  console.log("Success:", values);
};

const PeopleTab = ({ isEditable = false }) => {
  return (
    <Form
      name="people-settings"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <div className="people-container">
        <div className="icons-container">
          <div className="icon-item">
            <img
              src="https://cdn0.iconfinder.com/data/icons/business-blue-series-set-1-1/128/a-21-64.png"
              alt="men"
            />
            {isEditable ? (
              <Form.Item name="male">
                <InputNumber placeholder="male" defaultValue={1} />
              </Form.Item>
            ) : (
              <div className="icon-number">1</div>
            )}
          </div>
          <div className="icon-item">
            <img
              src="https://cdn4.iconfinder.com/data/icons/cosmetology-set/52/cosmetology-02-64.png"
              alt="female"
            />
            {isEditable ? (
              <Form.Item name="female">
                <InputNumber placeholder="female" defaultValue={2} />
              </Form.Item>
            ) : (
              <div className="icon-number">2</div>
            )}
          </div>
          <div className="icon-item">
            <img
              src="https://cdn3.iconfinder.com/data/icons/family-member-flat-happy-family-day/512/Sister-64.png"
              alt="girl"
            />
            {isEditable ? (
              <Form.Item name="girl">
                <InputNumber placeholder="girl" defaultValue={3} />
              </Form.Item>
            ) : (
              <div className="icon-number">3</div>
            )}
          </div>
          <div className="icon-item">
            <img
              src="https://cdn0.iconfinder.com/data/icons/avatar-2/500/man-2-64.png"
              alt="boy"
            />
            {isEditable ? (
              <Form.Item name="boy">
                <InputNumber placeholder="boy" defaultValue={4} />
              </Form.Item>
            ) : (
              <div className="icon-number">4</div>
            )}
          </div>
        </div>
        {isEditable ? (
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
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
