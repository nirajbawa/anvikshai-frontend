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
    <tr key={index} className="animate-pulse bg-gray-200">
      {Array.from({ length: 10 }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 w-full bg-gray-300 rounded"></div>
        </td>
      ))}
    </tr>
  ));

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h1 className="text-2xl font-semibold text-black my-5">
                Generated Courses
              </h1>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-white/90 backdrop-blur-sm">
                    {isLoading ? (
                      skeletonRows
                    ) : (
                      <tr className="border-b border-purple-100">
                        <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900 cursor-pointer group">
                          <div className="flex items-center gap-2">
                            Sr.No.
                            <SortIcon field="srno" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900 cursor-pointer group">
                          <div className="flex items-center gap-2">
                            Course Name
                            <SortIcon field="fullName" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                          User Id
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900 cursor-pointer">
                          <div className="flex items-center gap-2">
                            Generation Prompt
                            <SortIcon field="status" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                          Course Description
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                          Expected Months
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                          Daily Hours
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                          Progress
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                          Language
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                          Review
                        </th>

                        {/* <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                        Email
                      </th>
                      <th
                        className="px-6 py-3 text-left text-sm font-semibold text-purple-900 cursor-pointer"
                        onClick={() => handleSort("employmentDate")}
                      >
                        <div className="flex items-center gap-2">
                          bio
                          <SortIcon field="employmentDate" />
                        </div>
                      </th>

                      <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                        Education
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                        Stream of Education
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                        Language Preference
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                        verified
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                        onboarding
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                        Package
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                        Package Validity
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                        Razorpay Order Id
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                        Created At
                      </th> */}
                      </tr>
                    )}
                  </thead>
                  <tbody className="divide-y divide-purple-100">
                    {isLoading
                      ? skeletonRows
                      : students.map((student, index) => (
                          <tr
                            key={student.id}
                            className="hover:bg-purple-50 transition-colors duration-200"
                          >
                            <td className="px-6 py-4">
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>

                            <td className="px-6 py-4 text-gray-600">
                              {student.id}
                            </td>

                            <td className="px-6 py-4 text-gray-600 ">
                              {student.task_name_gen}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {student.user}
                            </td>
                            <td
                              onClick={() => {
                                handleModel();
                                setCurrentBio(student.description);
                                setCurrentTitle("Description");
                              }}
                              className="px-6 py-4 text-gray-600  cursor-pointer"
                            >
                              view
                            </td>
                            <td
                              className="px-6 py-4 text-gray-600 cursor-pointer"
                              onClick={() => {
                                handleModel();
                                setCurrentBio(student.generated_roadmap_text);
                                setCurrentTitle("Description");
                              }}
                            >
                              view
                            </td>

                            <td className="px-6 py-4 text-gray-600">
                              {student.expected_duration_months}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {student.daily_hours}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {student.completed == true
                                ? "completed"
                                : "In Progress"}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {student.language}
                            </td>
                            <td
                              className="px-6 py-4 text-gray-600 cursor-pointer"
                              onClick={() => {
                                navigate(`/expert/feedback/${student.id}`);
                              }}
                            >
                              open
                            </td>

                            {/* <td className="px-6 py-4 text-gray-600">
                          {student.education}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {student.stream_of_education}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {student.language_preference}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {student.verified ? "verified" : "pending"}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {student.onboarding ? "completed" : "remaining"}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {student.premium_package}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(student.validTill).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {student.razorpay_order_id}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(student.created_at).toLocaleString()}
                        </td> */}
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-600">
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
                    className="p-2 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors duration-200"
                  >
                    <ChevronLeft className="w-5 h-5 text-purple-600" />
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors duration-200"
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
