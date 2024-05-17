import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  labels: ['Phishing', 'Not Phishing',],
  legend: {
    show: false,
    position: 'bottom',
  },

  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree: React.FC = () => {
  const [totalUrlVisited, setTotalUrlVisited] = useState<number>(0);
  const [totalEmailVisited, setTotalEmailVisited] = useState<number>(0);
  const [totalPhishingUrl, setTotalPhishingUrl] = useState<number>(0);
  const [totalPhishingEmail, setTotalPhishingEmail] = useState<number>(0);
  const [emails, setEmails] = useState<Array<any>>([]);
  const [urls, setUrls] = useState<Array<any>>([]);
  const [urlpercentage0, setUrlPercentage0] = useState<number>(0);
  const [urlpercentage1, setUrlPercentage1] = useState<number>(0);
  useEffect(() => {
    // Fetch data from your API endpoints
    fetchData();
  }, []);
  useEffect(() => {
    // Fetch data from your API endpoints
    setTotalPhishingUrl(urls.reduce((count:any, item:any) => {
      console.log(item.status=="Phishing",count)
      return item.status == 'Phishing' ? count + 1 : count;
    }, 0));

    const phishingUrlPercentage = (totalPhishingUrl / urls.length) * 100;
    const nonPhishingUrlPercentage = 100 - phishingUrlPercentage;

    console.log(totalPhishingUrl,urls.length,phishingUrlPercentage,nonPhishingUrlPercentage )
    setUrlPercentage0(Math.floor(phishingUrlPercentage));
    setUrlPercentage1(Math.ceil(nonPhishingUrlPercentage));
    setState({
      series: [Math.floor(phishingUrlPercentage), Math.ceil(nonPhishingUrlPercentage)],
    })
  }, [urls]);
  const fetchData = async () => {
    try {
      const urlResponse = await fetch("http://localhost:3000"+'/email'); // Replace with your actual API endpoint
      const urlData = await urlResponse.json();
      setTotalUrlVisited(urlData.length);
      setUrls(urlData)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const [state, setState] = useState<ChartThreeState>({
    series: [urlpercentage0, urlpercentage1],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [urlpercentage0, urlpercentage1],
    }));
  };
  handleReset;

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Emails Analytics
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Phishing </span>
              <span> {urlpercentage0}% </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#745bb8]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Not Phishing </span>
              <span>  {urlpercentage1}%  </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
