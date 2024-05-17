import { URLData } from '../../types/phishingUrlData';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';

const phishingUrlData: URLData[] = [
  { url: 'https://example.com', status: 'Not Phishing' },
  { url: 'https://phishing.com', status: 'Phishing' },
  { url: 'https://example.org', status: 'Not Phishing' },
  { url: 'https://phish.net', status: 'Phishing' },
  { url: 'https://example.net', status: 'Not Phishing' },
];

const TableOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1" style={{ maxHeight: '400px', overflowY: 'auto' }}>
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Recent Visited Urls
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-2">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Url
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
        </div>

        {phishingUrlData.map((UrlData, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-2 ${
              key === phishingUrlData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {UrlData.url}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              {UrlData.status === 'Phishing' ? (
                  <RiCloseLine className="text-red-500 text-3xl" />
                ) : (
                  <RiCheckLine className="text-green-500 text-3xl" />
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
