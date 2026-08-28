import { companyData } from "../Data/Company";


const AboutComp = () => {
  const company: { [key: string]: any } = companyData;

  return (
    <div className="flex mt-5 flex-col gap-3">
      {Object.keys(company).map(
        (key, index) =>
          key != "Name" && (
            <div>
              <div key={index} className="text-xl mb-3   font-semibold">
                {key}
              </div>

              {key != "Website" ? (
                <div className="text-sm text-mine-shaft-300 text-justify">
                  {key != "Specialties"
                    ? company[key]
                    : company[key].map((item: string, index: number) => (
                        <span key={index}> &bull; {item}</span>
                      ))}
                </div>
              ) : (
                <a
                  href={company[key]}
                  className="text-sm text-bright-sun-400 text-justify"
                >
                  {company[key]}
                </a>
              )}
            </div>
          ),
      )}
    </div>
  );
};

export default AboutComp;
