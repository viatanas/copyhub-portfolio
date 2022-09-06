// Icon imports
import { Twitter, LinkedIn } from "iconoir-react";

// Component imports
import Tag from "@/components/Tags/Tag";

const AboutSection = ({ bio, services, clients, twitter, linkedin }) => {
  console.log(clients);
  return (
    <div className="flex flex-col w-full mt-10 space-y-10 lg:space-x-10 lg:flex-row">
      {/* Bio */}
      <div className="flex flex-col w-full lg:w-1/2">
        <div className="flex flex-col w-full">
          <span className="text-sm font-normal text-gray-900 font-inter">
            Biography
          </span>
          <p className="w-full mt-4 text-sm font-light leading-6 text-gray-500 whitespace-pre-wrap font-inter">
            {bio ? bio : "The user hasn't provided a bio yet."}
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full lg:w-1/2">
        {/* Services */}
        <div className="flex flex-col w-full">
          <span className="text-sm font-normal text-gray-900 font-inter">
            Services
          </span>

          <div className="flex flex-wrap items-center pl-2 mt-2">
            {services.length > 0 ? (
              services.map((service) => <Tag key={service} service={service} />)
            ) : (
              <span className="mt-2 -ml-2 text-sm font-light text-gray-500 font-inter">
                No services provided yet.
              </span>
            )}
          </div>
        </div>

        {/* Clients */}
        <div className="flex flex-col w-full mt-10">
          <span className="text-sm font-normal text-gray-900 font-inter">
            Clients
          </span>

          {clients.length < 1 && (
            <span className="mt-2 text-sm font-light text-gray-500 font-inter">
              No clients provided yet.
            </span>
          )}

          {clients.length > 0 && (
            <div className="flex flex-wrap items-center mt-2">
              {clients.map((client, index) => (
                <div key={client} className="mt-1">
                  <span className="text-sm font-light text-gray-500 font-inter">
                    {client}
                  </span>
                  {index < clients.length - 1 && (
                    <span className="mx-2 text-base text-gray-500">·</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Social links */}
        <div className="flex flex-col w-full mt-10">
          <span className="text-sm font-normal text-gray-900 font-inter">
            Links
          </span>
          <div className="flex items-center mt-4 space-x-2">
            {twitter && (
              <a
                rel="noreferrer"
                target={"_blank"}
                href={`https://${twitter}`}
                className="flex items-center px-3 space-x-2 bg-white border border-gray-200 rounded-full h-7 hover:border-gray-300"
              >
                <Twitter className="w-3 h-3 text-gray-900" />
                <span className="text-sm font-normal text-gray-900 font-inter">
                  Twitter
                </span>
              </a>
            )}

            {linkedin && (
              <a
                rel="noreferrer"
                target={"_blank"}
                href={`https://${linkedin}`}
                className="flex items-center px-3 space-x-2 bg-white border border-gray-200 rounded-full h-7 hover:border-gray-300"
              >
                <LinkedIn className="w-4 h-4 text-gray-900" />
                <span className="text-sm font-normal text-gray-900 font-inter">
                  LinkedIn
                </span>
              </a>
            )}
          </div>

          {!linkedin && !twitter && (
            <span className="text-sm font-light text-gray-500 font-inter">
              No social links provided yet.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
