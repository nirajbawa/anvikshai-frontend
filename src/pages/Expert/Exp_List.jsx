const Exp_List = () => {
    const students = [
      { name: "", function: "", review: "", email: "", employed: "", id: 43431 },
      { name: "", function: "", review: "", email: "", employed: "", id: 93021 },
      { name: "", function: "", review: "", email: "", employed: "", id: 10392 },
      { name: "", function: "", review: "", email: "", employed: "", id: 34002 },
      { name: "", function: "", review: "", email: "", employed: "", id: 91879 },
      { name: "", function: "", review: "", email: "", employed: "", id: 23042 }
    ];
  
    const getReviewColor = (review) => {
      switch (review) {
        case "positive": return "text-blue-500";
        case "neutral": return "text-gray-500";
        case "negative": return "text-red-500";
        default: return "text-black";
      }
    };
  
    return (
      <div className="min-h-screen bg-purple-100 flex flex-col items-center p-6">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-purple-300 p-4 text-xl font-semibold">AnvikshAI</div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Expert List</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-2">Name</th>
                  <th className="p-2">Function</th>
                  <th className="p-2">Review</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Employed</th>
                  <th className="p-2">ID</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="p-2 flex items-center">
                      <img src="https://via.placeholder.com/40" alt={student.name} className="w-8 h-8 rounded-full mr-2" />
                      {student.name}
                    </td>
                    <td className="p-2">{student.function}</td>
                    <td className={`p-2 ${getReviewColor(student.review)}`}>{student.review}</td>
                    <td className="p-2">{student.email}</td>
                    <td className="p-2">{student.employed}</td>
                    <td className="p-2">{student.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  export default Exp_List;
  