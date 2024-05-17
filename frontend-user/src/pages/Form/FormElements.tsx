import DefaultLayout from '../../layout/DefaultLayout';
import { useState } from 'react';
import axios from 'axios';

const FormElements = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isPhishing, setIsPhishing] = useState(false); // Assume it's not phishing initially
  const [url, setUrl] = useState(''); // To hold the URL input value
  const [errorMessage, setErrorMessage] = useState(''); // To hold any error messages

  const handleSubmit = async (event:any) => {
    event.preventDefault(); // Prevent the form from submitting normally
    setErrorMessage(''); // Clear any previous error messages

    try {
      const response = await axios.post('https://6237-196-70-252-214.ngrok-free.app/url', { text: url });
      if (response.data.prediction === 'malicious') {
        setIsPhishing(true);
      } else {
        setIsPhishing(false);
      }
      setSubmitted(true);
    } catch (error) {
      console.error('Error during API request:', error);
      setErrorMessage('An error occurred while checking the URL.');
    }
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Urls Check Form
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Url
                  </label>
                  <input
                    type="text"
                    placeholder="Enter an Url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Submit
                </button>
                {submitted && (
                  <div className="text-center mt-3">
                    {isPhishing ? (
                      <div className="mt-4 flex items-center justify-center text-red-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                        Phishing URL
                      </div>
                    ) : (
                      <div className="mt-4 flex items-center justify-center text-green-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Not Phishing Url
                      </div>
                    )}
                  </div>
                )}
                {errorMessage && (
                  <div className="mt-4 text-red-600 text-center">
                    {errorMessage}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormElements;
