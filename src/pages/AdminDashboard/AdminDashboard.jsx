import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export const AdminDashboard = () => {
  // State for sales chart
  const [salesMovie, setSalesMovie] = useState("");
  const [salesTimeRange, setSalesTimeRange] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [salesLabels, setSalesLabels] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);

  // State for ticket chart
  const [ticketCategory, setTicketCategory] = useState("");
  const [ticketLocation, setTicketLocation] = useState("");
  const [ticketData, setTicketData] = useState([]);

  // Labels for different time ranges
  const dailyLabel = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const weeksLabel = [
    "1st Week",
    "2nd Week",
    "3rd Week",
    "4th Week",
    "5th Week",
  ];
  const monthsLabel = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Helper function to generate random data
  const getRandomData = (length) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 30) + 1);
  };

  // Get movie title based on selection
  const getMovieTitle = (value) => {
    switch (value) {
      case "spiderman":
        return "Spiderman: Homecoming";
      case "avengers":
        return "Avengers: Endgame";
      case "superman":
        return "Superman";
      default:
        return "Avengers: End Game";
    }
  };

  // Get category title based on selection
  const getCategoryTitle = (value) => {
    switch (value) {
      case "ebv":
        return "ebv.id";
      case "cineone21":
        return "CineOne21";
      case "hiflix":
        return "hiflix";
      default:
        return "ebv.id";
    }
  };

  // Get location title based on selection
  const getLocationTitle = (value) => {
    switch (value) {
      case "bogor":
        return "Bogor";
      case "purwokerto":
        return "Purwokerto";
      case "surabaya":
        return "Surabaya";
      default:
        return "Bogor";
    }
  };

  // Handle sales filter
  const handleSalesFilter = (e) => {
    e.preventDefault();

    // Get labels based on time range
    let labels;
    switch (salesTimeRange) {
      case "daily":
        labels = dailyLabel;
        break;
      case "weekly":
        labels = weeksLabel;
        break;
      case "monthly":
        labels = monthsLabel;
        break;
      default:
        labels = dailyLabel;
    }

    setSalesLabels(labels);
    setSalesData(getRandomData(labels.length));
  };

  // Handle ticket filter
  const handleTicketFilter = (e) => {
    e.preventDefault();
    setTicketData(getRandomData(monthsLabel.length));
  };

  // Initialize with random data
  useEffect(() => {
    setSalesData(getRandomData(dailyLabel.length));
    setTicketData(getRandomData(monthsLabel.length));
  }, []);

  // Chart configuration for gradient background
  const createGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom,
    );
    gradient.addColorStop(0, "rgba(29, 78, 216, 0.5)");
    gradient.addColorStop(1, "rgba(29, 78, 216, 0)");
    return gradient;
  };

  // Sales chart configuration
  const salesChartData = {
    labels: salesLabels,
    datasets: [
      {
        label: "# of Sales",
        data: salesData,
        borderColor: "#1D4ED8",
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          return createGradient(ctx, chartArea);
        },
        borderWidth: 1,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Ticket chart configuration
  const ticketChartData = {
    labels: monthsLabel,
    datasets: [
      {
        label: "# of Sales",
        data: ticketData,
        borderColor: "#1D4ED8",
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          return createGradient(ctx, chartArea);
        },
        borderWidth: 1,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="mt-6 flex flex-col gap-y-8 md:py-8">
      {/* Sales Chart */}
      <div className="rounded-2xl bg-white p-10">
        <h2 className="mb-8 text-2xl font-medium">Sales Chart</h2>

        {/* Filter Selection */}

        <div className="mb-6 flex flex-col gap-5 md:flex-row">
          <div className="flex items-center rounded-md bg-[#EFF0F6] px-4 py-1">
            <select
              className="w-full rounded-lg bg-[#EFF0F6] px-6 py-3 text-[#4E4B66] md:w-fit"
              value={salesMovie}
              onChange={(e) => setSalesMovie(e.target.value)}
            >
              <option value="" disabled>
                Movies Name
              </option>
              <option value="spiderman">Spiderman: Homecoming</option>
              <option value="avengers">Avengers: End Game</option>
              <option value="superman">Superman</option>
            </select>
          </div>
          <div className="flex items-center rounded-md bg-[#EFF0F6] px-4 py-1">
            <select
              className="w-full rounded-lg bg-[#EFF0F6] px-6 py-3 text-[#4E4B66] md:w-fit"
              value={salesTimeRange}
              onChange={(e) => setSalesTimeRange(e.target.value)}
            >
              <option value="" disabled>
                Time Range
              </option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <button
            className="rounded-md bg-[#1D4ED8] py-3 text-white transition-colors hover:bg-blue-700 md:w-fit md:px-11"
            onClick={handleSalesFilter}
          >
            Filter
          </button>
        </div>

        {/* Movie Title and Chart */}
        <div>
          <h3 className="mb-4 text-base font-semibold">
            {salesMovie ? getMovieTitle(salesMovie) : "Avengers: End Game"}
          </h3>
          <div className="h-80">
            <Line data={salesChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Ticket Sales */}
      <div className="mb-10 rounded-2xl bg-white p-10">
        <h2 className="mb-8 text-2xl font-medium">Ticket Sales</h2>

        {/* Filter Selection */}
        <div className="mb-6 flex flex-col gap-5 md:flex-row">
          <div className="flex items-center rounded-md bg-[#EFF0F6] px-4 py-1">
            <select
              className="w-full rounded-lg bg-[#EFF0F6] px-6 py-3 text-[#4E4B66] md:w-fit"
              value={ticketCategory}
              onChange={(e) => setTicketCategory(e.target.value)}
            >
              <option value="" disabled>
                Category
              </option>
              <option value="ebv">ebv.id</option>
              <option value="cineone21">CineOne21</option>
              <option value="hiflix">hiflix</option>
            </select>
          </div>

          <div className="flex items-center rounded-md bg-[#EFF0F6] px-4 py-1">
            <select
              className="w-full rounded-lg bg-[#EFF0F6] px-6 py-3 text-[#4E4B66] md:w-fit"
              value={ticketLocation}
              onChange={(e) => setTicketLocation(e.target.value)}
            >
              <option value="" disabled>
                Location
              </option>
              <option value="bogor">Bogor</option>
              <option value="purwokerto">Purwokerto</option>
              <option value="surabaya">Surabaya</option>
            </select>
          </div>

          <button
            className="rounded-md bg-[#1D4ED8] py-3 text-white transition-colors hover:bg-blue-700 md:w-fit md:px-11"
            onClick={handleTicketFilter}
          >
            Filter
          </button>
        </div>

        {/* Category and Location Title with Chart */}
        <div>
          <h3 className="mr-2 inline text-base font-semibold">
            {ticketCategory ? getCategoryTitle(ticketCategory) : "ebv.id"},
          </h3>
          <h3 className="inline text-base font-semibold">
            {ticketLocation ? getLocationTitle(ticketLocation) : "Bogor"}
          </h3>
          <div className="mt-4 h-80">
            <Line data={ticketChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};
