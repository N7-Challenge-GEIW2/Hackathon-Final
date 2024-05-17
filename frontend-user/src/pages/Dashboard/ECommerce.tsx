import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChartThree from '../../components/Charts/ChartThree';
import TableOne from '../../components/Tables/TableOne';
import TableTwo from '../../components/Tables/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { faGlobe, faEnvelope, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ECommerce: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Url Visited" total="5">
        <FontAwesomeIcon
          icon={faGlobe}
          className="fill-current"
          size="lg"
          fill="none"
        />
        </CardDataStats>
        <CardDataStats title="Total Email Visited" total="5">
        <FontAwesomeIcon
          icon={faEnvelope}
          className="fill-current"
          size="lg"
          fill="none"
        />
        </CardDataStats>
        <CardDataStats title="Total Phishing Url" total="2">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="fill-current"
          size="lg"
          fill="none"
        />
        </CardDataStats>
        <CardDataStats title="Total Phishing Email" total="3">
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
          <TableOne />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <TableTwo />
        </div>

        <div className="col-span-12 md:col-span-6">
          <ChartTwo />
        </div>
        <div className="col-span-12 md:col-span-6">
          <ChartThree />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
