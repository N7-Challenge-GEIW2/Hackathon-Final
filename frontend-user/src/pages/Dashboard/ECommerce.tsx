import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChartThree from '../../components/Charts/ChartThree';
import TableOne from '../../components/Tables/TableOne';
import TableTwo from '../../components/Tables/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { faGlobe, faEnvelope, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ECommerce: React.FC = () => {
  const [totalUrlVisited, setTotalUrlVisited] = useState<number>(0);
  const [totalEmailVisited, setTotalEmailVisited] = useState<number>(0);
  const [totalPhishingUrl, setTotalPhishingUrl] = useState<number>(0);
  const [totalPhishingEmail, setTotalPhishingEmail] = useState<number>(0);
  const [emails, setEmails] = useState<Array<any>>([]);
  const [urls, setUrls] = useState<Array<any>>([]);
  const [urlpercentage, setUrlPercentage] = useState<Array<any>>([0,0]);
  const [emailPercentage, setEmailPercentage] = useState<Array<any>>([0,0]);
  useEffect(() => {
    // Fetch data from your API endpoints
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const urlResponse = await fetch("http://localhost:3000"+'/url'); // Replace with your actual API endpoint
      const urlData = await urlResponse.json();
      setTotalUrlVisited(urlData.length);
      setUrls(urlData)
      const emailResponse = await fetch("http://localhost:3000"+'/email'); // Replace with your actual API endpoint
      const emailData = await emailResponse.json();
      setTotalEmailVisited(emailData.length);
      setEmails(emailData)
      setTotalPhishingUrl(urlData.reduce((count:any, item:any) => item.status === 'Phishing' ? count + 1 : count, 0));

      setTotalPhishingEmail(emailData.reduce((count:any, item:any) => item.status === 'Phishing' ? count + 1 : count, 0));
      const phishingUrlPercentage = (totalPhishingUrl / urlData.length) * 100;

      // Calculate the percentage of non-phishing URLs
      const nonPhishingUrlPercentage = 100 - phishingUrlPercentage;
      setUrlPercentage([Math.floor(phishingUrlPercentage), Math.ceil(nonPhishingUrlPercentage)]);
      // Calculate the percentage of phishing Emails
      const phishingEmailPercentage = (totalPhishingEmail / totalEmailVisited) * 100;

      // Calculate the percentage of non-phishing Emails
      const nonPhishingEmailPercentage = 100 - phishingEmailPercentage;
      setEmailPercentage([phishingEmailPercentage, nonPhishingEmailPercentage]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };




  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Url Visited" total={totalUrlVisited+""}>
        <FontAwesomeIcon
          icon={faGlobe}
          className="fill-current"
          size="lg"
          fill="none"
        />
        </CardDataStats>
        <CardDataStats title="Total Email Visited" total={totalEmailVisited+""}>
        <FontAwesomeIcon
          icon={faEnvelope}
          className="fill-current"
          size="lg"
          fill="none"
        />
        </CardDataStats>
        <CardDataStats title="Total Phishing Url" total={totalPhishingUrl+""}>
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="fill-current"
          size="lg"
          fill="none"
        />
        </CardDataStats>
        <CardDataStats title="Total Phishing Email" total={totalPhishingEmail+""}>
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="fill-current"
          size="lg"
          fill="none"
        />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        
        <div className="col-span-12 xl:col-span-6">
          <TableOne phishingUrlData={urls}  />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <TableTwo phishingEmailData={emails}/>
        </div>

        <div className="col-span-12 md:col-span-6">
          <ChartTwo  />
        </div>
        <div className="col-span-12 md:col-span-6">
          <ChartThree  />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
