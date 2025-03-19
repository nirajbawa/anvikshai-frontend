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
import useAxios from "../../hook/useAxios";
import BioModel from "./BioModel";

const List = () => {
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

  const handleModel = () => {
    setModel((state) => !state);
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/admin/users?page=${currentPage}&limit=${itemsPerPage}`
      );
      setStudents(response.data?.users);
      setTotalPages(response.data?.total_pages);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Simulate loading
    fetchData();
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const filteredStudents = students.filter(
    (student) =>
      student.first_name ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortField === "employmentDate") {
      return sortDirection === "asc"
        ? new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime()
        : new Date(b[sortField]).getTime() - new Date(a[sortField]).getTime();
    }
    return sortDirection === "asc"
      ? String(a[sortField]).localeCompare(String(b[sortField]))
      : String(b[sortField]).localeCompare(String(a[sortField]));
  });

  // const totalPages = Math.ceil(totalPages / itemsPerPage);
  // const paginatedStudents = sortedStudents.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h1 className="text-2xl font-semibold text-black my-5">
                Student Management
              </h1>

              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="w-full pl-10 pr-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-white/90 backdrop-blur-sm">
                    <tr className="border-b border-purple-100">
                      <th
                        className="px-6 py-3 text-left text-sm font-semibold text-purple-900 cursor-pointer group"
                        onClick={() => handleSort("fullName")}
                      >
                        <div className="flex items-center gap-2">
                          Sr.No.
                          <SortIcon field="srno" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                        ID
                      </th>
                      <th
                        className="px-6 py-3 text-left text-sm font-semibold text-purple-900 cursor-pointer group"
                        onClick={() => handleSort("fullName")}
                      >
                        <div className="flex items-center gap-2">
                          Full Name
                          <SortIcon field="fullName" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                        Last Name
                      </th>
                      <th
                        className="px-6 py-3 text-left text-sm font-semibold text-purple-900 cursor-pointer"
                        onClick={() => handleSort("status")}
                      >
                        <div className="flex items-center gap-2">
                          DOB
                          <SortIcon field="status" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
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
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-100">
                    {students.map((student, index) => (
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

                        <td className="px-6 py-4">
                          <Tooltip content={student.first_name}>
                            <span className="font-medium text-gray-900">
                              {student.first_name}
                            </span>
                          </Tooltip>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {student.last_name}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1`}>
                            {new Date(student.dob).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Tooltip content={student.email}>
                            <span className="text-gray-600">
                              {student.email}
                            </span>
                          </Tooltip>
                        </td>
                        <td
                          className="px-6 py-4 text-gray-600 cursor-pointer"
                          onClick={() => {
                            handleModel();
                            setCurrentBio(student.bio);
                          }}
                        >
                          view
                        </td>

                        <td className="px-6 py-4 text-gray-600">
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
                        </td>
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
        title={"User Bio"}
        bio={currentBio}
      />
    </>
  );
};

export default List;
