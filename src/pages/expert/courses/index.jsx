import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { LoadingSpinner } from "./LoadingSpinner";
import { Tooltip } from "./Tooltip";
import { useState, useEffect } from "react";
import useAxios from "../../../hook/useAxios";
import BioModel from "./BioModel";
import { useNavigate } from "react-router";

const CoursePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("fullName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  const itemsPerPage = 10;
  const axiosInstance = useAxios();
  const [totalPages, setTotalPages] = useState(0);
  const [model, setModel] = useState(false);
  const [currentBio, setCurrentBio] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  let navigate = useNavigate();

  const handleModel = () => {
    setModel((state) => !state);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/expert/courses?page=${currentPage}&limit=${itemsPerPage}`
      );
      setStudents(response.data?.data);
      setTotalPages(response.data?.total_pages);
      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const filteredStudents = students.filter((student) =>
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const skeletonRows = Array.from({ length: itemsPerPage }).map((_, index) => (
    <tr key={index} className="animate-pulse bg-gray-200 dark:bg-gray-800 transition-colors">
      {Array.from({ length: 10 }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded transition-colors"></div>
        </td>
      ))}
    </tr>
  ));

  return (
    <>
      <div className="min-h-screen bg-transparent sm:p-8 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden transition-colors">
            <div className="p-6">
              <h1 className="text-2xl font-semibold text-black dark:text-white my-5 transition-colors">
                Generated Courses
              </h1>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-white dark:bg-gray-900 transition-colors">
                    {isLoading ? (
                      skeletonRows
                    ) : (
                      <tr className="border-b border-gray-200 dark:border-gray-800 transition-colors">
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-2">
                            Sr.No.
                            <SortIcon field="srno" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-2">
                            Course Name
                            <SortIcon field="fullName" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors">
                          User Id
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors cursor-pointer">
                          <div className="flex items-center gap-2">
                            Generation Prompt
                            <SortIcon field="status" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors">
                          Course Description
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors">
                          Expected Months
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors">
                          Daily Hours
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors">
                          Progress
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors">
                          Language
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors">
                          Review
                        </th>

                        {/* <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors">
                        Email
                      </th>
                      <th
                        className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors cursor-pointer"
                        onClick={() => handleSort("employmentDate")}
                      >
                        <div className="flex items-center gap-2">
                          bio
                          <SortIcon field="employmentDate" />
                        </div>
                      </th>

                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors">
                        Education
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors">
                        Stream of Education
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors">
                        Language Preference
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors">
                        verified
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors">
                        onboarding
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors">
                        Package
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors">
                        Package Validity
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors">
                        Razorpay Order Id
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 transition-colors">
                        Created At
                      </th> */}
                      </tr>
                    )}
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800 transition-colors">
                    {isLoading
                      ? skeletonRows
                      : students.map((student, index) => (
                          <tr
                            key={student.id}
                            className="hover:bg-purple-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                          >
                            <td className="px-6 py-4">
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>

                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors">
                              {student.id}
                            </td>

                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors ">
                              {student.task_name_gen}
                            </td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors">
                              {student.user}
                            </td>
                            <td
                              onClick={() => {
                                handleModel();
                                setCurrentBio(student.description);
                                setCurrentTitle("Description");
                              }}
                              className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors  cursor-pointer"
                            >
                              view
                            </td>
                            <td
                              className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors cursor-pointer"
                              onClick={() => {
                                handleModel();
                                setCurrentBio(student.generated_roadmap_text);
                                setCurrentTitle("Description");
                              }}
                            >
                              view
                            </td>

                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors">
                              {student.expected_duration_months}
                            </td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors">
                              {student.daily_hours}
                            </td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors">
                              {student.completed == true
                                ? "completed"
                                : "In Progress"}
                            </td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors">
                              {student.language}
                            </td>
                            <td
                              className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors cursor-pointer"
                              onClick={() => {
                                navigate(`/expert/feedback/${student.id}`);
                              }}
                            >
                              open
                            </td>

                            {/* <td className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors">
                          {student.education}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors">
                          {student.stream_of_education}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors">
                          {student.language_preference}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors">
                          {student.verified ? "verified" : "pending"}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors">
                          {student.onboarding ? "completed" : "remaining"}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors">
                          {student.premium_package}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors">
                          {new Date(student.validTill).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors">
                          {student.razorpay_order_id}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 transition-colors">
                          {new Date(student.created_at).toLocaleString()}
                        </td> */}
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredStudents.length
                  )}{" "}
                  of {filteredStudents.length} entries
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 disabled:opacity-50 disabled:hover:bg-transparent transition-colors duration-200"
                  >
                    <ChevronLeft className="w-5 h-5 text-purple-600" />
                  </button>
                  <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 disabled:opacity-50 disabled:hover:bg-transparent transition-colors duration-200"
                  >
                    <ChevronRight className="w-5 h-5 text-purple-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BioModel
        model={model}
        handler={handleModel}
        title={currentTitle}
        bio={currentBio}
      />
    </>
  );
};

export default CoursePage;
