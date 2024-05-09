import React, { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { AllCasesData } from "../constants/types"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CasesData {
  timeline: { date: string }[]
  cases: number[]
}

type ChartData = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    fill: boolean
    backgroundColor: string
    borderColor: string
    pointRadius: number
  }[]
  options?: {
    maintainAspectRatio: boolean
    scales: {
      x?: {
        min: string
        max: string
        stepSize: number
      }
      y?: {
        min?: number
        stepSize: number
        type?: string
      }
    }
  }

}

function LineGraph({ data }: { data?: AllCasesData | null }) {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "COVID-19 Cases",
        data: [],
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointRadius: 3,
      },
    ],
    options: {
      maintainAspectRatio: false,
      scales: {
        x: {
          min: "1/22/20",
          max: "2/22/20",
          stepSize: 100,
        },
        y: {
          stepSize: 1000000000,
          type: "linear",
        },
      },
    },
  })

  useEffect(() => {
    console.log("inside graph", data)
    if (data && data.cases) {
      const labels: string[] = []
      const cases: number[] = []
      for (const [key, value] of Object.entries(data.cases)) {
        labels.push(key)
        cases.push(value)
        
      }
      setChartData({
        ...chartData,
        labels,
        datasets: [{ ...chartData.datasets[0], data: cases }],
      })
    } else {
      console.log("No Data")
    }
  }, [data])

  console.log(chartData)
  return <Line data={chartData} options={{ maintainAspectRatio: false }} />;
}

export default LineGraph
