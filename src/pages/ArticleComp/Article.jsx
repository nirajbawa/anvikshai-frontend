import React from "react";
import { IconButton, Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router";

const Article = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Back Button - Top Left Corner */}
      <IconButton
        className="absolute top-20 left-4 bg-gray-200 text-black hover:bg-gray-300 transition"
        onClick={() => navigate(-1)}
      >
        <i className="fas fa-chevron-left text-lg" />
      </IconButton>

      {/* Article Text */}
      <h1 className="absolute top-[15%] left-1/2 transform -translate-x-1/2 text-2xl font-bold text-gray-700">
        Article
      </h1>

      {/* Cards Container */}
      <div className="absolute top-[25%] left-1/2 transform -translate-x-1/2 w-full flex flex-wrap justify-center gap-12">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="w-80 shadow-lg">
            <CardHeader color="blue-gray" className="relative h-48">
              <img
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="card-image"
                className="w-full h-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                UI/UX Review Check
              </Typography>
              <Typography>
                The place is close to Barceloneta Beach and bus stop just 2 min by
                walk and near to &quot;Naviglio&quot; where you can enjoy the main
                night life in Barcelona.
              </Typography>
            </CardBody>
            <CardFooter className="flex justify-between pt-0">
            <Button className="border border-blue-gray-500 text-blue-gray-500 bg-transparent shadow-none hover:bg-blue-gray-100">
                Read More
              </Button>
              <Button className="bg-[#EADAFF] text-black shadow-md hover:bg-purple-300">
                Mark as Read
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Article;
