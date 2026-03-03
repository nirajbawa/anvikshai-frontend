const List = () => {
    const students = [
      { name: "John Michael", function: "Manager", review: "positive", email: "john@user.com", employed: "23/04/18", id: 43431 },
      { name: "Alexa Liras", function: "Programator", review: "positive", email: "alexa@user.com", employed: "11/01/19", id: 93021 },
      { name: "Laurent Perrier", function: "Executive", review: "neutral", email: "laurent@user.com", employed: "19/09/17", id: 10392 },
      { name: "Michael Levi", function: "Backend developer", review: "positive", email: "michael@user.com", employed: "24/12/08", id: 34002 },
      { name: "Richard Gran", function: "Manager", review: "negative", email: "richard@user.com", employed: "04/10/21", id: 91879 },
      { name: "Miriam Eric", function: "Programator", review: "positive", email: "miriam@user.com", employed: "14/09/20", id: 23042 }
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
            <h2 className="text-2xl font-bold text-center mb-4">Mentors List</h2>
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
  
  export default List;
  