import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import useAxios from "../../hook/useAxios";

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [readArticles, setReadArticles] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  let { dayId, taskId } = useParams();

  // Fetch articles
  const fetchArticles = async () => {
    try {
      const response = await axiosInstance.get(`/content/article/${dayId}`);
      setArticles(response.data?.data?.articles_list || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [dayId]);

  const totalArticles = articles.length;
  const score =
    totalArticles > 0
      ? Math.min(Math.round((readArticles.size / totalArticles) * 10), 10)
      : 0;

  // Track article read status
  const handleReadArticle = async (link, index) => {
    try {
      setReadArticles((prev) => {
        const updated = new Set(prev).add(index);
        return updated;
      });

      const updatedScore = Math.min(
        Math.round(((readArticles.size + 1) / totalArticles) * 10),
        10
      );

      window.open(link, "_blank"); // Open link in a new tab

      await axiosInstance.post(`/content/article/${dayId}`, {
        marks: updatedScore,
        status: true,
      });
    } catch (error) {
      console.error("Error updating article progress:", error);
    }
  };

  if (loading) {
    return (
      <>
        <h1 className="text-2xl font-bold text-gray-700 text-center mt-10">
          Articles
        </h1>
        <div className="text-center mt-4">
          <Typography variant="h6">Marks: {score} / 10</Typography>
        </div>

        <div className="flex flex-wrap justify-center gap-12 mt-10">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="w-80 shadow-lg p-4 animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-6"></div>
              <CardFooter className="flex justify-between pt-0">
                <div className="w-24 h-10 bg-gray-300 rounded"></div>
                <div className="w-24 h-10 bg-gray-300 rounded"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex">
        <div className="px-5 py-3 pl-10 pt-7">
          <button
            className="bg-purple-200 flex justify-center items-center pl-4 py-3 pr-2 rounded-lg hover:bg-purple-100 duration-300 transition-all text-black"
            onClick={() => navigate(`/dashboard/task/${taskId}/${dayId}`)}
          >
            <ArrowBackIosIcon />
          </button>
        </div>
        <div className="w-full">
          <h1 className=" text-2xl font-bold text-gray-700 text-center mt-10">
            Articles
          </h1>
          <div className="text-center mt-4">
            <Typography variant="h6">Marks: {score} / 10</Typography>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-12 mt-10">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <Card key={index} className="w-80 shadow-lg p-4">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {article.topic}
                </Typography>
                <Typography className="line-clamp-3">
                  Click "Read More" to explore the full content.
                </Typography>
              </CardBody>
              <CardFooter className="flex justify-between pt-0">
                <Button
                  className="border border-blue-gray-500 text-blue-gray-500 bg-transparent shadow-none hover:bg-blue-gray-100"
                  onClick={() => handleReadArticle(article.link, index)}
                  disabled={readArticles.has(index)}
                >
                  {readArticles.has(index) ? "Completed" : "Read More"}
                </Button>
                <Button
                  className={
                    readArticles.has(index)
                      ? "bg-green-500 text-white shadow-md hover:bg-green-600"
                      : "bg-[#EADAFF] text-black shadow-md hover:bg-purple-300"
                  }
                  disabled={true}
                >
                  {readArticles.has(index) ? "Completed" : "Remaining"}
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Typography className="text-gray-500">No articles found.</Typography>
        )}
      </div>
    </>
  );
};

export default Article;

// Now the score updates immediately when an article is marked as read, and then sends th
