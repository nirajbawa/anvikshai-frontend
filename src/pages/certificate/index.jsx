import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import useAxios from "../../hook/useAxios";
import Lottie from "react-lottie-player";
import NotFound from "../../assets/lotties/not-found.json";

const baseURL = import.meta.env.VITE_BACKEND_URL;

function CertificatePage() {
  const [certificate, setCertificate] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get("/content/certificates")
      .then((data) => {
        setCertificate(data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch certificates:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full h-full p-20">
      <div className="w-full h-full flex justify-start items-center flex-wrap gap-y-16 pl-14 gap-x-10">
        {loading ? (
          Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="w-72 h-72 rounded-lg bg-gray-200 animate-pulse p-10 shadow-md"
              ></div>
            ))
        ) : certificate.length > 0 ? (
          certificate.map((cert) => (
            <div
              key={cert.id}
              className="w-72 h-72 rounded-lg bg-fuchsia-100 flex-col gap-10 p-10 shadow-md text-center flex justify-center"
            >
              <h1 className="font-bold text-xl">{cert.task_name}</h1>
              <a
                href={`${baseURL}/task/download-certificate/${cert.link}`}
                download
              >
                <Button className="bg-purple-400 border-none hover:bg-purple-300">
                  Download
                </Button>
              </a>
            </div>
          ))
        ) : (
          <div className="w-full h-full flex justify-center items-center min-h-[70vh]">
            <Lottie
              loop
              animationData={NotFound}
              play
              className="w-full h-[30rem]"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CertificatePage;
