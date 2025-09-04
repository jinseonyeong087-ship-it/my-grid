import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./App.css";

export default function App() {
  const cities = [
    "서울", "도쿄", "뉴욕", "런던", "파리", "베를린", "시드니", "멕시코시티", "상파울루", "케이프타운",
    "모스크바", "베이징", "홍콩", "싱가포르", "방콕", "델리", "두바이", "이스탄불", "토론토", "로스앤젤레스",
    "마드리드", "암스테르담", "취리히", "헬싱키", "오슬로", "스톡홀름", "코펜하겐", "부다페스트", "프라하", "비엔나",
    "아테네", "리마", "보고타", "카라카스", "하노이", "자카르타", "마닐라", "카이로", "나이로비", "요하네스버그",
    "리야드", "테헤란", "바르샤바", "브뤼셀", "더블린", "헬싱키", "리가", "탈린", "빈", "브라티슬라바"
  ];

  const generateRainfall = () => {
    const rainfall = {};
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    months.forEach(month => {
      rainfall[month] = Math.floor(Math.random() * 300);
    });
    return rainfall;
  };

  const [rowData] = useState(
    cities.map(city => {
      const rainfall = generateRainfall();
      const avg = Math.round(Object.values(rainfall).reduce((a, b) => a + b, 0) / 12);
      return { city, ...rainfall, avg };
    })
  );

const columnDefs = useMemo(
  () => [
    { headerName: "도시", field: "city", pinned: "left", filter: true },
    { headerName: "평균 강우량", field: "avg", filter: "agNumberColumnFilter", sortable: true, pinned: "right" },
    { headerName: "1월", field: "jan", filter: "agNumberColumnFilter" },
    { headerName: "2월", field: "feb", filter: "agNumberColumnFilter" },
    { headerName: "3월", field: "mar", filter: "agNumberColumnFilter" },
    { headerName: "4월", field: "apr", filter: "agNumberColumnFilter" },
    { headerName: "5월", field: "may", filter: "agNumberColumnFilter" },
    { headerName: "6월", field: "jun", filter: "agNumberColumnFilter" },
    { headerName: "7월", field: "jul", filter: "agNumberColumnFilter", sort: "desc" },
    { headerName: "8월", field: "aug", filter: "agNumberColumnFilter" },
    { headerName: "9월", field: "sep", filter: "agNumberColumnFilter" },
    { headerName: "10월", field: "oct", filter: "agNumberColumnFilter" },
    { headerName: "11월", field: "nov", filter: "agNumberColumnFilter" },
    { headerName: "12월", field: "dec", filter: "agNumberColumnFilter" }
  ],
  []
);


  const defaultColDef = useMemo(
    () => ({ resizable: true, sortable: true, flex: 1, minWidth: 100 }),
    []
  );

return (
  <div style={{ padding: "16px 10%" }}>
    <h1>🌧️ 월별 강우량 데이터 (도시별)</h1>

    <div
      className="ag-theme-quartz custom-grid"
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination
      />
    </div>

    <div style={{ marginTop: 40 }}>
      <h2>📊 도시별 평균 강우량</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={rowData}>
          <XAxis dataKey="city" hide />
          <YAxis />
          <Tooltip />
          <Bar dataKey="avg" fill="#00bcd4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

}
