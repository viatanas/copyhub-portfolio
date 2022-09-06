// Absolute imports
import Head from "next/head";

// Imports
import NavPrimary from "@/components/Navs/NavPrimary";

const Waitlist = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Head>
        <title>Copyhub - Request Invite</title>
        <meta name="description" content="Copyhub - Portfolios That Impress" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavPrimary slug={"waitlist"} />

      <main className="flex justify-center w-full px-10 pt-12 mt-14 lg:px-0">
        <div className="flex flex-col w-full max-w-md">
          {/* Header */}
          <section>
            <div className="flex flex-col mt-5 text-2xl font-light text-gray-900 font-inter">
              <span className="italic">Portfolios</span>
              <span className="mt-1">that impress.</span>
            </div>
            <p className="mt-3 text-sm font-light leading-6 text-gray-500 font-inter">
              {` Build simple, professional, and well-designed copywriting
              portfolios in minutes. Join the waitlist to be notified when we're
              live.`}
            </p>
          </section>

          {/* User Inputs */}

          <form
            action="https://copyhub.us8.list-manage.com/subscribe/post?u=20bb292f39e7de3e265fb5e82&amp;id=d796e5dcb5&amp;f_id=009e4de0f0"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            target="_self"
          >
            <div className="flex flex-col mt-6 mc-field-group">
              <label
                htmlFor="mce-EMAIL"
                className="text-sm font-light text-gray-900 font-inter"
              >
                Enter your email *
              </label>
              <input
                type="email"
                name="EMAIL"
                id="mce-EMAIL"
                required={true}
                placeholder="name@example.com"
                className="w-full px-4 py-3 mt-2 text-sm font-light text-gray-900 bg-gray-900 rounded-lg outline-none bg-opacity-5 font-inter"
              />
            </div>

            <div className="flex flex-col mt-8 mc-field-group">
              <label
                htmlFor="mce-MMERGE5"
                className="text-sm font-light text-gray-900 font-inter"
              >
                Link to your current portfolio (if any)
              </label>
              <span className="mt-1 text-xs font-light leading-5 text-gray-500 font-inter">
                Sharing your current portfolio helps us understand the types of
                copy you create to ensure we can showcase all of your greatest
                work.
              </span>
              <input
                type="url"
                name="MMERGE5"
                id="mce-MMERGE5"
                placeholder="https://drive.google.com/drive/folders/portfolio"
                className="w-full px-4 py-3 mt-4 text-sm font-light text-gray-900 bg-gray-900 rounded-lg outline-none bg-opacity-5 font-inter"
              />
            </div>
            <div id="mce-responses">
              <div id="mce-error-response" className="hidden"></div>
              <div id="mce-success-response" className="hidden"></div>
            </div>
            <div aria-hidden="true">
              <input
                type="text"
                name="b_20bb292f39e7de3e265fb5e82_d796e5dcb5"
                tabIndex="-1"
                value=""
              />
            </div>

            <div className="flex justify-start w-full mt-2">
              <button
                type="submit"
                value="Subscribe"
                name="subscribe"
                id="mc-embedded-subscribe"
                className="flex items-center h-10 px-4 space-x-2 text-sm font-normal text-white bg-gray-900 rounded-lg w-max hover:bg-gray-700 font-inter"
              >
                Join waitlist
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Waitlist;
