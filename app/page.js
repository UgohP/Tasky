export default function Home() {
  return (
    <>
      <section className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4">My Tasks</h2>

          <form className="flex mb-4">
            <input
              type="text"
              placeholder="Add a new task"
              className="flex-1 p-2 border border-gray-300 rounded-l"
            />
            <input
              type="submit"
              value="Add Task"
              className="bg-blue-600 text-white px-4 rounded-r"
            />
          </form>
        </div>
      </section>
    </>
  );
}
