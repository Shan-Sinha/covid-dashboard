import React, { useState, useEffect } from "react";
import ContactList from "./Contacts/ContactList";
import ContactDetails from "./Contacts/ContactDetails";
import ContactForm from "./Contacts/ContactForm";
import FetchData from "./Utils/FetchData";
import LeafletMap from "./Utils/LeafletMap";
import LineGraph from "./Utils/LineGraph";
import { AllCasesData, CountryData } from "./constants/types";
import Navbar from "./Navbar/Navbar";
import {
  BrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const App: React.FC = (props) => {
  console.log(props);
  const [selectedContactId, setSelectedContactId] = useState<string>("");
  const [worldWideData, setWorldWideData] = useState<AllCasesData>();
  const [countriesData, setCountriesData] = useState<CountryData[] | null>(
    null
  );

  const handleViewDetails = (id: string) => {
    setSelectedContactId(id);
  };

  const handleAddContact = () => {
    setSelectedContactId("");
  };

  useEffect(() => {
    async function fetchWorldWideData() {
      await FetchData(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      ).then((data) => {
        setWorldWideData(data as unknown as AllCasesData);
      });
    }

    async function fetchCountriesData() {
      await FetchData("https://disease.sh/v3/covid-19/countries").then(
        (data) => {
          setCountriesData(data as unknown as CountryData[]);
        }
      );
    }
    fetchWorldWideData();
    fetchCountriesData();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ContactForm />,
      children: [
        {
          path: "contact-details",
          element: <ContactDetails contactId={""} />,
        },
      ],
    },
  ]);

  return (
    <div>
      <BrowserRouter>
        <div className="flex space-x-4">
        <Link
            to={"/"}
            className={classNames(
              "text-gray-300 hover:bg-gray-700 hover:text-white",
              "rounded-md px-3 py-2 text-sm font-medium"
            )}
          >
            Add Contact
          </Link>
          <Link
            to={"contact-list"}
            className={classNames(
              "text-gray-300 hover:bg-gray-700 hover:text-white",
              "rounded-md px-3 py-2 text-sm font-medium"
            )}
          >
            Contact List
          </Link>
          <Link
            to={"map"}
            className={classNames(
              "text-gray-300 hover:bg-gray-700 hover:text-white",
              "rounded-md px-3 py-2 text-sm font-medium"
            )}
          >
            Map
          </Link>
          <Link
            to={"graph"}
            className={classNames(
              "text-gray-300 hover:bg-gray-700 hover:text-white",
              "rounded-md px-3 py-2 text-sm font-medium"
            )}
          >
            Graph
          </Link>
          
        </div>
        <Routes>
          <Route
            path="/"
            element={<ContactForm onSubmit={handleAddContact} />}
          ></Route>

          <Route
            path="/contact-list"
            element={<ContactList onViewDetails={handleViewDetails} />}
          ></Route>
          <Route
            path="/contact-detail"
            element={<ContactDetails contactId={selectedContactId} />}
          ></Route>
          <Route
            path="/map"
            element={<LeafletMap countriesData={countriesData} />}
          ></Route>
          <Route
            path="/graph"
            element={<LineGraph data={worldWideData} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
